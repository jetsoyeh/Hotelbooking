import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/functions'





// Your web app's Firebase configuration
 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCqywQCFVo7lm9qIhtM_mE4K-Q13zYtByw",
    authDomain: "hotelbooking-5e0ec.firebaseapp.com",
    projectId: "hotelbooking-5e0ec",
    storageBucket: "hotelbooking-5e0ec.appspot.com",
    messagingSenderId: "292880310635",
    appId: "1:292880310635:web:f079ceff372ff528ddec2e",
    measurementId: "G-NYNB2VM9KH"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
const functions = firebase.functions()

export {
  firebase,
  auth,
  db,
  storage,
  functions
}