import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import styles from '../../styles/ProductList.module.css'
import CategoryFilter from '../../components/CategoryFilter'
import Navbar from '../../components/Navbar';

function ProductList({products}) {
  const [selectedCategory, setSelectedCategory] = useState();
  const updateCategory = (cate) => setSelectedCategory(cate);
  const productsDisplay = selectedCategory ? products.filter(pro=>pro.category==selectedCategory) : products

  return (
    <div>
      <Navbar />
      <h1 className={styles.heading}>Our products:</h1>
      <CategoryFilter products={products} updateCategory={updateCategory} />
      <div className={styles.container}>
        {productsDisplay.map(pro =>
          <Link href={`/products/${pro.id}`} key={pro.id}>
          <a className={styles.product}>
            <Image src='https://picsum.photos/250/250' alt={pro.name} width={250} height={250}></Image>
            <div className={styles.footer}>
              <p>{pro.price}kr/stk</p>
              <p>Category: {pro.category}</p>
              <p>{pro.title}</p>
            </div>
          </a>
          </Link>
        )}
      </div>

    </div>
  )
}

`The context object has:
1.Params - /pages/customer/[id].js/ =>
    context.params.id
2. Request and Response - context.req / context.res
3. Querystring - index.js?archived=true =>
    context.query.archived`
export async function getServerSideProps(context) {
  const res = await fetch('https://fakestoreapi.com/products')
  const products = await res.json()

  if (!products) return { redirect: { destination: '/', permanent: false, } }
  return { props: { products } }
}

export default ProductList
