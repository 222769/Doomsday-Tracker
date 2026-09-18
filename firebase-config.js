// firebase-config.js
// Fill these in from your own Firebase project (free tier) to enable
// cross-device sync. See SYNC_SETUP.md for step-by-step instructions.
//
// These values are safe to commit to a public repo — they identify your
// project, they are not secret credentials. Access control is handled by
// Firestore security rules (see SYNC_SETUP.md), not by hiding this file.
//
// Until you replace the placeholders below, sync stays disabled and the
// app works exactly as it did before — local-only, no network calls.
export const firebaseConfig = {
  apiKey: "REPLACE_WITH_YOUR_API_KEY",
  authDomain: "REPLACE_WITH_YOUR_PROJECT.firebaseapp.com",
  projectId: "REPLACE_WITH_YOUR_PROJECT_ID",
  storageBucket: "REPLACE_WITH_YOUR_PROJECT.appspot.com",
  messagingSenderId: "REPLACE_WITH_YOUR_SENDER_ID",
  appId: "REPLACE_WITH_YOUR_APP_ID",
};
