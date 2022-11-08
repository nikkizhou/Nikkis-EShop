import React from 'react'
import Image from 'next/image';
import styles from '../../styles/Product.module.css'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../cart_redux/cart.slice';

function Product({ product }) {
  const dispatch = useDispatch();
  // const router = useRouter()
  // const {id} = router.query
  // const product = products.find(pro => pro.id == id)
  
  return (
    <div className={styles.product}>
      <h2>{product.title}</h2>
      <Image
        src={product.image}
        alt={product.title} width={300} height={300}
        className={product.image}
      ></Image>
      <p><span className={styles.price}>{product.price}kr/stk</span>  Category: {product.category} </p>
      <button className={styles.button} onClick={() => {
        dispatch(addToCart(pro))
        alert('The product is added to cart!')
      }}>Add to Cart</button>
      <p>{product.description}</p>
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
