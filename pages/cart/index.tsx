import React,{useEffect} from 'react'
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../../styles/CartPage.module.css';
import { Cart } from '../../interfaces'
import { getCart, updateCart } from '../../redux/actions/cartActions';

const CartPage = () => {
  const dispatch = useDispatch()
  const cart: Cart = useSelector((state:any) => state.cart.cart);
  console.log(cart, 'cart in line 13 in cart');
  
  
  useEffect(() => {
    // dispatch is not working without argument!!!
    dispatch(getCart('dd'))
  }, [])
  //
  
  
  const getTotalPrice:Function = () => {
    const price:number = cart.reduce((accumulator, pro) => accumulator + pro.quantity * pro.price, 0)
    return Math.round(price * 100) / 100        
  };

  return (
    <div className={styles.container}>
      {cart.length === 0 ? (
        <h1>Your Cart is Empty!</h1>
      ) : (
        <>
          <div className={styles.header}>
            <div>Image</div>
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Actions</div>
            <div>Total Price</div>
          </div>
          {cart?.map((pro) => (
            <div className={styles.body}>
              <div className={styles.image}>
                <Image src={pro.image} height="80" width="65" />
              </div>
              <p>{pro.title}</p>
              <p>{pro.price}kr</p>
              <p>{pro.quantity}</p>
              <div className={styles.buttons}>
                <button onClick={() => dispatch(updateCart({ operation: 'increaseQty', productId: pro.id }))}>
                  +
                </button>
                <button onClick={() => dispatch(updateCart({ operation: 'decreaseQty', productId: pro.id }))}>
                  -
                </button>
                <button onClick={() => dispatch(updateCart({ operation: 'removeProduct', productId: pro.id }))}>
                  x
                </button>
              </div>
              <p>{Math.round(pro.quantity * pro.price * 100) / 100}kr</p>
            </div>
          ))}
          <h2>Grand Total: {getTotalPrice()}kr</h2>
        </>
      )}
     
    </div>
  );
};

export default CartPage;



  
 
