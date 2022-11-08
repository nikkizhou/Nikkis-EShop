import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import styles from '../styles/ProductList.module.css'
import { useDispatch } from 'react-redux';
import { addToCart } from '../cart_redux/cart.slice';

function ProductCard({ pro }) {
  const [isHovering, setIsHovering] = useState(false);
  const dispatch = useDispatch();

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div className={styles.productCard}>
      <Link href={`/products/${pro.id}`} key={pro.id} >
        <a className={styles.product} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          {isHovering && <div className={styles.hoverEffect}>Check Details</div>} 
          <Image src={pro.image} alt={pro.name} width={200} height={200}></Image>
          <p className={styles.text}>{pro.title} <span> {pro.price}kr</span></p>
        </a>
      </Link>
      <button className={styles.button} onClick={() => {
        dispatch(addToCart(pro))
        alert('The product is added to cart!')
      }}>Add to Cart</button>
    </div>
  )
}

export default ProductCard
