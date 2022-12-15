import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/HomePage.module.css'

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Head><title>Nikki's Eshop</title></Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span>Nikki's Eshop</span>
        </h1>
        <Link href='/products' >👉Start My Journy...</Link>
      </main>
      </div>
  )
}
