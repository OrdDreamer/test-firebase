import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

const callbacks = new Set();
export function addListenerOnAuth(callback) {
  if (typeof callback === "function") {
    callbacks.add(callback);
  }
}

function onAuth(user) {
  for (const callback of callbacks) {
    callback(user);
  }
}

export function userSignIn() {
  signInWithPopup(getAuth(), new GoogleAuthProvider())
    .then((result) => {
      onAuth(result.user);
    }).catch((error) => {
      console.error("Сталася помилка, спробуйте, будь ласка, ще раз.")
    });
}

export function userSignOut() {
  signOut(getAuth()).then(() => {
    console.log("Sign-out successful.");
  }).catch((error) => {
    console.log("Sign-out UNsuccessful.");
  });
}