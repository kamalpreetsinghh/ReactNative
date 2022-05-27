import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBslYUnzWETICC4oHgeP6kJ_q6FvZ_8pbo",
    authDomain: "locationmapping-34342.firebaseapp.com",
    projectId: "locationmapping-34342",
    storageBucket: "locationmapping-34342.appspot.com",
    messagingSenderId: "553599874460",
    appId: "1:553599874460:web:4487b6e0a84f2a9f844459"
  };

  export const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  export const auth = getAuth(app);