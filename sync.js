// sync.js — optional cross-device sync via a short code, no accounts.
//
// Backed by Firestore (see firebase-config.js / SYNC_SETUP.md). The
// Firebase SDK is only fetched the first time a sync action actually runs
// — if sync is never used (or never configured), this file never makes a
// network request, so the app stays fully local/offline by default.
//
// Model: a synced checklist is one document at codes/{code} holding the
// watched-item ids. "Get a code" writes the device's current progress as
// a brand new document. "Enter a code" reads an existing document and
// replaces local progress with it. After that, both sides push their own
// changes and listen for the other's, so either device stays in sync.

import { firebaseConfig } from "./firebase-config.js";

const SYNC_CODE_KEY = "watchTracker.syncCode.v1";
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // no 0/O/1/I/L — easy to read and type back
const FIREBASE_SDK_VERSION = "10.13.0";

function isConfigured() {
  return Boolean(firebaseConfig.apiKey) && !firebaseConfig.apiKey.startsWith("REPLACE_");
}

function generateCode() {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  let raw = "";
  for (const b of bytes) raw += CODE_ALPHABET[b % CODE_ALPHABET.length];
  return raw.slice(0, 4) + "-" + raw.slice(4, 8);
}

function normalizeCode(input) {
  const cleaned = input.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (cleaned.length !== 8) return null;
  return cleaned.slice(0, 4) + "-" + cleaned.slice(4, 8);
}

// Lazily load the Firebase modules + initialize the app, once, on first use.
let firestorePromise = null;
function loadFirestore() {
  if (!firestorePromise) {
    firestorePromise = (async () => {
      const { initializeApp } = await import(
        `https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}/firebase-app.js`
      );
      const firestoreModule = await import(
        `https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}/firebase-firestore.js`
      );
      const app = initializeApp(firebaseConfig);
      const db = firestoreModule.getFirestore(app);
      return { db, ...firestoreModule };
    })();
  }
  return firestorePromise;
}

let activeUnsubscribe = null;

export const sync = {
  isConfigured,
  normalizeCode,

  getStoredCode() {
    try {
      return localStorage.getItem(SYNC_CODE_KEY);
    } catch {
      return null;
    }
  },

  // Publishes the device's current progress under a brand new code.
  async createCode(watchedIds) {
    const { db, doc, setDoc, serverTimestamp } = await loadFirestore();
    const code = generateCode();
    await setDoc(doc(db, "codes", code), {
      watchedIds: [...watchedIds],
      updatedAt: serverTimestamp(),
    });
    try {
      localStorage.setItem(SYNC_CODE_KEY, code);
    } catch {
      // Storage may be unavailable — sync still works for this session.
    }
    return code;
  },

  // Reads an existing code's progress. Throws if the code doesn't exist.
  async joinCode(code) {
    const { db, doc, getDoc } = await loadFirestore();
    const ref = doc(db, "codes", code);
    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error("That code wasn't found.");
    try {
      localStorage.setItem(SYNC_CODE_KEY, code);
    } catch {
      // Storage may be unavailable — sync still works for this session.
    }
    return snap.data().watchedIds || [];
  },

  // Writes the device's current progress to an already-active code.
  async push(code, watchedIds) {
    const { db, doc, setDoc, serverTimestamp } = await loadFirestore();
    await setDoc(doc(db, "codes", code), {
      watchedIds: [...watchedIds],
      updatedAt: serverTimestamp(),
    });
  },

  // Subscribes to live updates for a code; onChange fires with the latest
  // watched-id array whenever any device (including this one) writes.
  async listen(code, onChange) {
    const { db, doc, onSnapshot } = await loadFirestore();
    if (activeUnsubscribe) activeUnsubscribe();
    activeUnsubscribe = onSnapshot(doc(db, "codes", code), (snap) => {
      if (snap.exists()) onChange(snap.data().watchedIds || []);
    });
  },

  // Disconnects and forgets the stored code. Local progress is left as-is.
  stop() {
    if (activeUnsubscribe) {
      activeUnsubscribe();
      activeUnsubscribe = null;
    }
    try {
      localStorage.removeItem(SYNC_CODE_KEY);
    } catch {
      // Nothing to clean up if storage isn't available.
    }
  },
};
