import React, { useState } from 'react'
import styles from '../../styles/ProductPage.module.css'
import CategoryFilter from '../../components/CategoryFilter'
import ProductCard from '../../components/productsPage/ProductCard';
import {Product} from '../../interfaces'
import { GetServerSideProps } from 'next'
import { prisma } from '../../prisma/prismaClient'

function ProductPage({ products }: { products: Product[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const updateCategory:Function = (cate:string) => setSelectedCategory(cate);
  const productsDisplay: string | Product[] =
    selectedCategory && selectedCategory != 'All'
      ? products.filter(pro => pro.category == selectedCategory)
      : products

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const products = await fetch('https://fakestoreapi.com/products').then(res => res.json())
  products.forEach(async (p:any) => {
    const { id, title, price, description, category, image } = p
    await prisma.product.create({ data: { id, title, price, description, category, image }})
  });

  // const products = await prisma.product.findMany()
  // if (!products) return { redirect: { destination: '/', permanent: false, } }
  return { props: { products} }
}

export default ProductPage
