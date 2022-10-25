import React, { useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router'
import products from '../../data/data.json'
import styles from '../../styles/Product.module.css'

function Product() {
  const router = useRouter()
  const {id} = router.query
  const product = products.find(pro => pro.id == id)
  
  return (
    <div className={styles.product}>
      <h2>{product.title}</h2>
      <Image
        src='https://picsum.photos/400/400'
        alt={product.title} width={300} height={300}
        className={product.image}
      ></Image>
      <p>{product.price}kr/stk</p>
      <p>category: {product.category }</p>
      <p>{product.description }</p>
    </div>
  )
}

export default Product
