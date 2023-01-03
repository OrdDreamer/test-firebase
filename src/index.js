import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { userSignIn, userSignOut } from './auth';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDzrIjxMANcnuFMVxmD7t6ueqbK3ijInpU",
  authDomain: "orddreamer-test-firebase.firebaseapp.com",
  projectId: "orddreamer-test-firebase",
  storageBucket: "orddreamer-test-firebase.appspot.com",
  messagingSenderId: "256769224354",
  appId: "1:256769224354:web:13d1372c5f53d117c3b1fb"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);





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


const auth = getAuth();
auth.onAuthStateChanged(() => {
  console.log("###")
  console.log(auth.currentUser)
  console.log("###")
})


document.querySelector("#log-in").addEventListener("click", userSignIn);
document.querySelector("#log-out").addEventListener("click", userSignOut);




