import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import styles from '../../styles/ProductPage.module.css'
import { useDispatch } from 'react-redux';
import { Product } from '../../interfaces'
import { updateCart } from '../../redux/actions/cartActions';
import { AppDispatch } from '../../redux/store';

function ProductCard({ pro }: {pro:Product}) {
  const dispatch = useDispatch<AppDispatch>();
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const handleMouseOver = (value: boolean) => setIsHovering(value);
  
  return (
    <div className={styles.productCard}>
      <Link href={`/products/${pro.id}`} key={pro.id} >
        <div className={styles.product}
          onMouseOver={()=> handleMouseOver(true)}
          onMouseOut={() => handleMouseOver(false)}>
          {isHovering
            && <div className={styles.hoverEffect}>Show Details</div>} 
            <Image src={pro.image} alt={pro.title} width={200} height={200}></Image>
            <p className={styles.text}>{pro.title} <span> {pro.price}kr</span></p>
        </div>
      </Link>
      <button
        className={styles.button}
        onClick={() => {
        dispatch(updateCart({ operation: 'increaseQty', pro}))
      }}>Add to Cart 🛒</button>
    </div>
  )
}

export default ProductCard
