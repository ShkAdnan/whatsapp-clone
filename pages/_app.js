import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import {  db, auth } from './../firebase'
import Login from './login';
import Loading from '../components/Loading';
import { useEffect } from 'react';
import { collection, doc, setDoc } from "firebase/firestore"; 


function MyApp({ Component, pageProps }) {

  const [ user, loading  ] = useAuthState(auth);

  //Adding User to Firebase database
  useEffect( async () => {
    if( user ){
      const users = collection(db, "users");

      await setDoc(doc(users, user.uid), {
        email :  user.email,
        lastSeen : new Date().getTime(),
        photoUrl : user.photoURL
      },
      { merge : true});
    }
  }, [user]);

  if(loading) return <Loading />

  if(!user) return <Login />

  return <Component {...pageProps} />
}

export default MyApp
