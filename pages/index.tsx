import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, getUser } from '../redux/actions/userAction';
import { RootState } from '../redux/store';
import { useUser } from '@auth0/nextjs-auth0';

export default function Home() {
  const dispatch = useDispatch()
  const { user } = useUser()
  const dbUser = useSelector((state: RootState) => state.user.user)
  
  //user && dispatch(getUser())
  console.log(dbUser, 'page index line 19');

  // useEffect(() => {
  //   user && dispatch(getUser(user))
  // }, [user])
  
  return (
    <div className={styles.container}>
      <Head><title>Nikki's Eshop</title></Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span>Nikki's Eshop</span>
        </h1>
        <Link href='/products' >👉Start My Journy...</Link>
        <button onClick={()=>dispatch(getUser(user))}>getUser</button>
      </main>
      </div>
  )
}
