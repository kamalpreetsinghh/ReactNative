import * as firebase from "firebase/compat";
import "firebase/compat/firestore";
import 'firebase/compat/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBslYUnzWETICC4oHgeP6kJ_q6FvZ_8pbo",
    authDomain: "locationmapping-34342.firebaseapp.com",
    projectId: "locationmapping-34342",
    storageBucket: "locationmapping-34342.appspot.com",
    messagingSenderId: "553599874460",
    appId: "1:553599874460:web:4487b6e0a84f2a9f844459"
  };

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = firebase.auth();
const fireDB = app.firestore();

export { auth, fireDB };