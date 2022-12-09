import React,{useEffect} from 'react'
import '../styles/globals.css'
import store from '../redux/store'; 
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <UserProvider>
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </UserProvider>
  )
}

export default MyApp
