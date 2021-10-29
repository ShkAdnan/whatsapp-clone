import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import {  db, auth } from './../firebase'
import Login from './login';

function MyApp({ Component, pageProps }) {

  const [ user ] = useAuthState(auth);

  console.log(user);

  if(!user) return <Login />

  return <Component {...pageProps} />
}

export default MyApp
