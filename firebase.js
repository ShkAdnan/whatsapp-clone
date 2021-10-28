import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAy6BNED8UKNrFXd8piVRIAK9uv1c43DHs",
    authDomain: "whatapp-2-aafed.firebaseapp.com",
    projectId: "whatapp-2-aafed",
    storageBucket: "whatapp-2-aafed.appspot.com",
    messagingSenderId: "469771560518",
    appId: "1:469771560518:web:b117f5f7265c8acb920c47"
  };

  const app = !firebase.apps[0].length ? firebase.initializeApp(firebaseConfig)  : firebase.app();

  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { db, auth, provider }