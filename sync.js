// sync.js — account-free cross-device sync via a generated 16-digit code.
//
// Backed by Firestore (see firebase-config.js / SYNC_SETUP.md). The
// Firebase SDK is only fetched the first time a sync action actually runs
// — if sync is never used (or never configured), this file never makes a
// network request, so the app stays fully local/offline by default.
//
// Model: a synced checklist is one document at codes/{code} holding the
// watched-item ids. "Register" (createCode) writes the device's current
// progress under a brand new 16-digit code — that code IS the account,
// there's no separate username or password. "Sign in" (joinCode) reads an
// existing document and replaces local progress with it. After that, both
// sides push their own changes and listen for the other's, so either
// device stays in sync.
//
// The canonical form of a code is a plain 16-digit string (no spaces) —
// that's what's stored in localStorage and used as the Firestore document
// id. formatCodeForDisplay adds spaces for on-screen display only.

import { firebaseConfig } from "./firebase-config.js";

const SYNC_CODE_KEY = "watchTracker.syncCode.v1";
const CODE_LENGTH = 16;
const FIREBASE_SDK_VERSION = "10.13.0";

function isConfigured() {
  return Boolean(firebaseConfig.apiKey) && !firebaseConfig.apiKey.startsWith("REPLACE_");
}

function generateCode() {
  const digits = new Uint32Array(CODE_LENGTH);
  crypto.getRandomValues(digits);
  let code = "";
  for (const d of digits) code += String(d % 10);
  return code;
}

// Accepts input with or without spaces/dashes; returns the canonical
// 16-digit code, or null if it isn't a valid one.
function normalizeCode(input) {
  const cleaned = input.replace(/[^0-9]/g, "");
  if (cleaned.length !== CODE_LENGTH) return null;
  return cleaned;
}

function formatCodeForDisplay(code) {
  return code.replace(/(.{4})/g, "$1 ").trim();
}

// Without this, a stalled connection (poor signal, a network that blocks
// Firestore's long-lived channel, etc.) leaves the caller's promise
// pending forever — no error, no success, just a spinner stuck on
// "Signing in…"/"Generating…" with no way out. Race every one-shot
// network call against a timeout so it always settles one way or another.
const NETWORK_TIMEOUT_MS = 15000;

function withTimeout(promise, message) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error(message)), NETWORK_TIMEOUT_MS);
    }),
  ]);
}

// Lazily load the Firebase modules + initialize the app, once, on first use.
// If loading ever fails outright (not just times out — a genuine rejection,
// e.g. the SDK import errors), the cached promise is cleared so the next
// attempt starts fresh instead of every future call reusing that same
// permanently-rejected promise until the page is reloaded.
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
    })().catch((err) => {
      firestorePromise = null;
      throw err;
    });
  }
  return firestorePromise;
}

let activeUnsubscribe = null;

export const sync = {
  isConfigured,
  normalizeCode,
  formatCodeForDisplay,

  getStoredCode() {
    try {
      return localStorage.getItem(SYNC_CODE_KEY);
    } catch {
      return null;
    }
  },

  // Publishes the device's current progress under a brand new code.
  async createCode(watchedIds) {
    const { db, doc, setDoc, serverTimestamp } = await withTimeout(
      loadFirestore(),
      "Connection timed out. Check your internet connection and try again."
    );
    const code = generateCode();
    await withTimeout(
      setDoc(doc(db, "codes", code), {
        watchedIds: [...watchedIds],
        updatedAt: serverTimestamp(),
      }),
      "Connection timed out. Check your internet connection and try again."
    );
    try {
      localStorage.setItem(SYNC_CODE_KEY, code);
    } catch {
      // Storage may be unavailable — sync still works for this session.
    }
    return code;
  },

  // Reads an existing code's progress. Throws if the code doesn't exist.
  async joinCode(code) {
    const { db, doc, getDoc } = await withTimeout(
      loadFirestore(),
      "Connection timed out. Check your internet connection and try again."
    );
    const ref = doc(db, "codes", code);
    const snap = await withTimeout(
      getDoc(ref),
      "Connection timed out. Check your internet connection and try again."
    );
    if (!snap.exists()) throw new Error("That code wasn't found.");
    try {
      localStorage.setItem(SYNC_CODE_KEY, code);
    } catch {
      // Storage may be unavailable — sync still works for this session.
    }
    return snap.data().watchedIds || [];
  },

  // Applies an incremental add/remove to the synced list rather than
  // overwriting the whole array. This matters once two devices share a
  // code: overwriting with each device's full local copy is a
  // last-write-wins race — if both toggle something around the same
  // moment, whichever write lands second silently erases the other's
  // change. arrayUnion/arrayRemove are applied server-side as transforms
  // on top of whatever the document currently holds, so two devices
  // changing different ids at the same time both survive.
  async pushDelta(code, ids, watched) {
    if (!ids.length) return;
    const { db, doc, updateDoc, arrayUnion, arrayRemove, serverTimestamp } = await withTimeout(
      loadFirestore(),
      "Connection timed out. Check your internet connection and try again."
    );
    await withTimeout(
      updateDoc(doc(db, "codes", code), {
        watchedIds: watched ? arrayUnion(...ids) : arrayRemove(...ids),
        updatedAt: serverTimestamp(),
      }),
      "Connection timed out. Check your internet connection and try again."
    );
  },

  // Subscribes to live updates for a code; onChange fires with the latest
  // watched-id array whenever any device (including this one) writes. A
  // live subscription has no natural "timeout" (it's meant to sit open
  // indefinitely), but a connection error at least gets logged instead of
  // failing silently forever.
  async listen(code, onChange) {
    const { db, doc, onSnapshot } = await withTimeout(
      loadFirestore(),
      "Connection timed out. Check your internet connection and try again."
    );
    if (activeUnsubscribe) activeUnsubscribe();
    activeUnsubscribe = onSnapshot(
      doc(db, "codes", code),
      (snap) => {
        if (snap.exists()) onChange(snap.data().watchedIds || []);
      },
      (err) => {
        console.warn("Sync listener error:", err);
      }
    );
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
