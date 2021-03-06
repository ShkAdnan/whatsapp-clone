import { initializeApp, getApp , getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth , GoogleAuthProvider} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAy6BNED8UKNrFXd8piVRIAK9uv1c43DHs",
    authDomain: "whatapp-2-aafed.firebaseapp.com",
    projectId: "whatapp-2-aafed",
    storageBucket: "whatapp-2-aafed.appspot.com",
    messagingSenderId: "469771560518",
    appId: "1:469771560518:web:b117f5f7265c8acb920c47"
  };

  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

  const db = getFirestore();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  export { db, auth, provider }