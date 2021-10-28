import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import {  db } from './../firebase'
import Login from './login';

function MyApp({ Component, pageProps }) {

  const [ user ] = useAuthState(null);

  if(!user) return <Login />

  return <Component {...pageProps} />
}

export default MyApp
