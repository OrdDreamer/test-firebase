import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import firebase from 'firebase/compat';

const firebaseConfig = {
  apiKey: "AIzaSyDzrIjxMANcnuFMVxmD7t6ueqbK3ijInpU",
  authDomain: "orddreamer-test-firebase.firebaseapp.com",
  projectId: "orddreamer-test-firebase",
  storageBucket: "orddreamer-test-firebase.appspot.com",
  messagingSenderId: "256769224354",
  appId: "1:256769224354:web:13d1372c5f53d117c3b1fb"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
// const db = getDatabase(app);



function writeUserData(id, name) {
  push(ref(db, 'users/' + user.uid + "/library"),
    {
      id: id,
      watched: false,
    }
  ).then(() => {
    console.log("Write => Done!");
  });
}

const elements = {
  form: document.querySelector("#main-form"),
  list: document.querySelector(".main-list"),
}

elements.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const {
    elements: { "input-id": id, "input-name": name }
  } = e.currentTarget;
  writeUserData(id.value, name.value);
})









import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
let user = null;

const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    user = result.user;
    readData();
  }).catch((error) => {
    console.error("Сталася помилка, спробуйте, будь ласка, ще раз.")
});

function readData() {
  const starCountRef = ref(db, 'users/' + user.uid + "/library");
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    let markup = "";
    if (data) {
      markup = Object.values(data).map((item) => {
        return `
      <li class="main-list-item">
        <p><b>${item.id}</b></p>
        <p>Wathced: ${item.watched}</p>
      </li>
    `
      }).join("");
    }
    elements.list.innerHTML = markup;
    console.log("Read => Done!");
  });
}