import React from 'react'
import styles from '../../styles/CartPage.module.css';

function Header() {
  return (
    <div className={styles.header}>
      <div>Image</div>
      <div>Product</div>
      <div>Price</div>
      <div>Quantity</div>
      <div>Actions</div>
      <div>Total Price</div>
    </div >
  )
}

export default Header

 
