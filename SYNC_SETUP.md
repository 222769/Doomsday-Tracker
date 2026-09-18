# Setting up account sync

Tapping the header's **Account** button lets someone **Register** for a
random 16-digit code — something like `7492 1856 0374 9021` — that's their
whole login. **Sign In** with that same code on another device (or hand it
to someone else) shares the same checklist progress live. No email, no
username, no password — the code itself is the only credential.

It's built on [Firestore](https://firebase.google.com/docs/firestore),
Google's free-tier realtime database. There's no server code to write or
host — the app talks to Firestore directly from the browser. You just need
to create a free Firebase project once and paste six values into
`firebase-config.js`.

Until you do this, the Account button stays hidden and the app works
exactly as it did before (local-only, no network calls).

## 1. Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com/) and sign in with a Google account.
2. Click **Add project**, give it any name (e.g. "watch-tracker"), and finish the wizard. You can decline Google Analytics — it isn't needed.

## 2. Create a Firestore database

1. In your new project, open **Build → Firestore Database** in the left sidebar.
2. Click **Create database**.
3. Choose any region close to you, and start in **production mode** (we'll add the right rules in step 4).

## 3. Register a web app

1. In the project's **Project settings** (gear icon, top left) → **General** tab, scroll to **Your apps**.
2. Click the **`</>`** (web) icon to register a new web app. Any nickname is fine. You don't need Firebase Hosting.
3. Firebase will show a `firebaseConfig` object like this:

   ```js
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "watch-tracker-xxxxx.firebaseapp.com",
     projectId: "watch-tracker-xxxxx",
     storageBucket: "watch-tracker-xxxxx.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef1234567890",
   };
   ```

4. Copy those six values into `firebase-config.js` in this repo, replacing the `REPLACE_WITH_...` placeholders.

These values are safe to commit to a public repo — they identify your
project, not authenticate anyone. Access control happens in step 4.

## 4. Set Firestore security rules

Without auth, security has to come from the rules themselves rather than
from checking who's logged in. Since every code is a random 16-digit
number (10 quadrillion possibilities), the rule below allows read/write
only to documents whose ID matches that shape — anyone who has a specific
code can read and write that one shared checklist, and nobody can browse
or list other people's codes.

1. In Firestore, open the **Rules** tab.
2. Replace the contents with:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /codes/{code} {
         allow read, write: if code.matches('^[0-9]{16}$');
       }
     }
   }
   ```

3. Click **Publish**.

## 5. Deploy and test

Push `firebase-config.js` with your real values, redeploy the site, then
open it on two devices (or two browser profiles): tap **Account → Register**
on one to generate a code, **Account → Sign In** with that code on the
other, and check an item — it should appear on both within a second or two.

## Notes and limits

- Firestore's free tier (50K reads / 20K writes per day) is far more than
  personal or small-group use needs.
- Anyone with a code has full read/write access to that shared checklist
  — treat a code like a shared login, not a secret password, and don't
  post it publicly.
- If `firebase-config.js` still has placeholder values, the Account button
  is hidden automatically and the rest of the app is unaffected.
