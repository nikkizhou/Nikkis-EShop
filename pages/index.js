import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
 
  return (
    <div className={styles.container}>
      <Head><title>Nikki's Eshop</title></Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span>Nikki's Eshop</span>
        </h1>
        <Link href='/products' >Start My Journy...</Link>
      </main>

     
    </div>
  )
}
