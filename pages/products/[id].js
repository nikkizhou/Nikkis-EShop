import React from 'react'
import Image from 'next/image';
import styles from '../../styles/Product.module.css'

function Product({product}) {
  // const router = useRouter()
  // const {id} = router.query
  // const product = products.find(pro => pro.id == id)
  
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

//generate generate dynamic routing page statically with getStaticPaths() and getStaticProps()
export async function getStaticPaths() {
  const res = await fetch('https://fakestoreapi.com/products')
  const products = await res.json()
  const paths = products.map((pro) => ({ params: { id: pro.id.toString() }}))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  // the params comes from getStaticPath 
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`)
  const product = await res.json()
  return { props: { product } }
}

export default Product
