import React from 'react'
import styles from '../../styles/CartPage.module.css';
import { Product } from '../../interfaces';

function PriceInfo({ cart }: { cart: Product[] }) {
  const getTotalPrice: Function = () => {
    const price: number = cart?.reduce((accumulator: number, pro) => accumulator + pro?.quantity * pro?.price, 0)
    return Math.round(price * 100) / 100
  };

  return (
    <h2 className={styles.totalCost}>
      <div>Total cost (incl.VAT): </div>
      <div>{getTotalPrice()}kr</div>
    </h2>
  )
}

export default PriceInfo
