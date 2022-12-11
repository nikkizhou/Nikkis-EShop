import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import styles from '../styles/ProductList.module.css'
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart.slice';
import { Product } from '../interfaces'
import { updateCart } from '../redux/actions/cartActions';

function ProductCard({ pro }: {pro:Product}) {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleMouseOver = () => setIsHovering(true);
  const handleMouseOut = () => setIsHovering(false);
  
  return (
    <div className={styles.productCard}>
      <Link href={`/products/${pro.id}`} key={pro.id} >
        <a className={styles.product} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          {isHovering && <div className={styles.hoverEffect}>Show Details</div>} 
          <Image src={pro.image} alt={pro.title} width={200} height={200}></Image>
          <p className={styles.text}>{pro.title} <span> {pro.price}kr</span></p>
        </a>
      </Link>
      <button className={styles.button} onClick={() => {
        dispatch(updateCart({ operation: 'increaseQty', productId: pro.id }))
      }}>Add to Cart 🛒</button>
    </div>
  )
}

export default ProductCard
