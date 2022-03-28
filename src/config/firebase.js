import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
} = process.env;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBiNFfgJR8j8_cz2ZZi2xGXTw423jlB5Do",
//   authDomain: "books-project-7c3ea.firebaseapp.com",
//   projectId: "books-project-7c3ea",
//   storageBucket: "books-project-7c3ea.appspot.com",
//   messagingSenderId: "502879326361",
//   appId: "1:502879326361:web:4c35da43ea5445beed6808"
// };

let app,
  db,
  auth = null;

if (!getApps().length) {
  console.log("Connected to firebase 🔥");
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth();
}

export { app, db, auth };
