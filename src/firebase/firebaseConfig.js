import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCDJz8zlqkhz07HvZ9D3dREojxnWWEwmdg",
    authDomain: "react-app-cursos-2f2f7.firebaseapp.com",
    projectId: "react-app-cursos-2f2f7",
    storageBucket: "react-app-cursos-2f2f7.appspot.com",
    messagingSenderId: "370669486208",
    appId: "1:370669486208:web:22073ef7811b3de6c96665"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  
  export {
      db,
      googleAuthProvider,
      firebase
  }