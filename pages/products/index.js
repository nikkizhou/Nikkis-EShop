import React, { useState } from 'react'
import products from '../../data/data.json'
import Link from 'next/link'
import Image from 'next/image';
import styles from '../../styles/ProductList.module.css'
import CategoryFilter from '../../components/CategoryFilter'
function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState();
  const updateCategory = (cate) => setSelectedCategory(cate);
  const productsDisplay = selectedCategory ? products.filter(pro=>pro.category==selectedCategory) : products

  return (
    <div>
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

export default ProductList
//
