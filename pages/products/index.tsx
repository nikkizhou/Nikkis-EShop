import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import {Product} from '../../interfaces'
import { prisma } from '../../prisma/prismaClient'
import styles from '../../styles/ProductPage.module.css'
import CategoryFilter from '../../components/productsPage/CategoryFilter'
import ProductCard from '../../components/productsPage/ProductCard';
import SearchForm from '../../components/productsPage/SearchForm';

function ProductPage({ products }: { products: Product[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [searchedProducts, setSearchedProducts] = useState(products)
  const updateCategory: Function = (cate: string) => setSelectedCategory(cate);
  
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = e.target.input.value
    const results = products.filter(pro =>new RegExp(value, 'i').test(pro.title))
    setSearchedProducts(results)
    e.target.input.value = ''
  }

  let productsDisplay: string | Product[] =
    selectedCategory && selectedCategory != 'All'
      ? searchedProducts.filter(pro => pro.category == selectedCategory)
      : searchedProducts

  const showAllPro = () =>  setSearchedProducts(products)
   
  return (
    <div className={styles.products}>
      <SearchForm handleSubmit={handleSubmit} showAllPro={showAllPro} />
      <CategoryFilter products={products} updateCategory={updateCategory} />
      <main className={styles.container_products}>
      {productsDisplay.length===0 && <h1>No Product Found!</h1>}
       {productsDisplay.map((product) => (
          <ProductCard key={product.id} pro={product} />
        ))}
      </main>
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const products = await prisma.product.findMany()
  if (!products) return { redirect: { destination: '/', permanent: false, } }
  return { props: { products } }
  
  // const products = await fetch('https://fakestoreapi.com/products').then(res => res.json())
  // products.forEach(async (p:any) => {
  //   const { id, title, price, description, category, image } = p
  //   await prisma.product.create({ data: { id, title, price, description, category, image }})
  // });
}

export default ProductPage
