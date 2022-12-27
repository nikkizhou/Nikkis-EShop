import React,{useEffect} from 'react'
import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import type { AppProps } from 'next/app'
import { UserProvider} from '@auth0/nextjs-auth0';
import { updateUser, getUser } from '../redux/actions/userActions';
import { getCart } from '../redux/actions/cartActions'
import { useDispatch, useSelector } from 'react-redux';
import { useUser, getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import store  from '../redux/store';
import { Provider } from 'react-redux'
import { AppDispatch } from '../redux/store';
import { RootState } from '../redux/store';
import { UserI } from '../interfaces'

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch<AppDispatch>();
  const authUser = useUser().user
  const dbUser:UserI = useSelector((state: RootState) => state.user.user)

  useEffect(() => {
    dispatch(getUser(authUser))
  }, [authUser])

  useEffect(() => {
    dbUser?.id ? dispatch(getCart(dbUser?.id)) : dispatch(getCart(null))
  }, [dbUser])
  
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>  
  )
}

const MyAppWrapper = ({ Component, pageProps }: AppProps)=> {
  return (
    <Provider store={store}>
      <UserProvider>
        <MyApp Component={Component} pageProps={pageProps} />
      </UserProvider>
    </Provider>
  )
}

export default MyAppWrapper
