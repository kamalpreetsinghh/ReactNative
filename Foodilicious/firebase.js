import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBivrmiu1uPspOErPWUnCk4e4AbagXPLbU",
    authDomain: "foodilicious-79307.firebaseapp.com",
    projectId: "foodilicious-79307",
    storageBucket: "foodilicious-79307.appspot.com",
    messagingSenderId: "973640135409",
    appId: "1:973640135409:web:2b71062430ae009c09af50"
  };

  export const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  export const auth = getAuth(app);