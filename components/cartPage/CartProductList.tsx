import React from 'react'
import Image from 'next/image';
import { Product } from '../../interfaces';
import { RootState, AppDispatch } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { updateCart } from '../../redux/actions/cartActions';
import styles from '../../styles/CartPage.module.css';

function CartProductList({ cart }: { cart: Product[] }) {
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div className={styles.productContainer}>
      {cart?.map((pro, index) => (
        <div className={styles.product} key={index}>
          <div className={styles.image}>
            <Image src={pro?.image} height="80" width="65" alt='product' />
          </div>
          <p>{pro?.title}</p>
          <p>{pro?.price}kr</p>
          <p>{pro?.quantity}</p>
          <div className={styles.buttons}>
            <button onClick={() => dispatch(updateCart({ operation: 'increaseQty', pro }))}>+</button>
            <button onClick={() => dispatch(updateCart({ operation: 'decreaseQty', pro }))}> -</button>
            <button onClick={() => dispatch(updateCart({ operation: 'removeProduct', pro }))}>x</button>
          </div>
          <p>{Math.round(pro?.quantity * pro?.price * 100) / 100}kr</p>
        </div>
      ))}
    </div>
  )
}

export default CartProductList
