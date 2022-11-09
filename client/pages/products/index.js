import React, { useState } from 'react'
import styles from '../../styles/ProductList.module.css'
import CategoryFilter from '../../components/CategoryFilter'

import ProductCard from '../../components/ProductCard';

function ProductList({products}) {
  const [selectedCategory, setSelectedCategory] = useState();
  const updateCategory = (cate) => setSelectedCategory(cate);
  const productsDisplay = selectedCategory && selectedCategory!='All' ? products.filter(pro=>pro.category==selectedCategory) : products

  return (
    <div>
      <CategoryFilter products={products} updateCategory={updateCategory} />
      <main className={styles.container}>
       {productsDisplay.map((product) => (
          <ProductCard key={product.id} pro={product} />
        ))}
      </main>
      
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
//
