import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../../styles/CartPage.module.css';
import { Cart, Product, UserI } from '../../interfaces'
import { updateCart } from '../../redux/actions/cartActions';
import { RootState,AppDispatch } from '../../redux/store';
import CusAlert from '../../components/CusAlert'
import axios from 'axios';


const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const cart: Cart = useSelector((state: RootState) => state.cart.cart);
  const user: UserI = useSelector((state: RootState) => state.user.user);
  
  const closeAlert: Function = () => setAlertStatus('')
  const [alertStatus, setAlertStatus] = useState<string | {error:string}>();
  
  const decreaseQty = (pro: Product) => {
    pro.quantity === 1
      ? removeProduct(pro.id)
      : dispatch(updateCart({ operation: 'decreaseQty', productId: pro.id }))
  }

  const removeProduct = (productId:number) => 
    dispatch(updateCart({ operation: 'removeProduct', productId}))
  
  const addOrders = async () => {
    const cartDb = cart?.map(pro => ({ productId: pro.id, userId: user.id, quantity: pro.quantity }))
    await axios.post('api/orders', cartDb)
      .then(() => setAlertStatus('Success'))
      .catch(err => setAlertStatus({ error: err.message }))
  }

  const handleCheckout = async () => {
    await addOrders()
    cart.map(pro => removeProduct(pro.id))
  }
  
  const getTotalPrice:Function = () => {
    const price:number = cart?.reduce((accumulator, pro) => accumulator + pro.quantity * pro.price, 0)
    return Math.round(price * 100) / 100        
  };

  const message = {
    title: 'Purchase Succeeded!',
    description: 'You can check your shopping history in profile page'
  }

  return (
    <div className={styles.container}>
      {alertStatus && <CusAlert status={alertStatus} closeAlert={closeAlert} message={message} />}
      {cart?.length === 0 ? (
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
          </div >
          <div className={styles.productContainer}>
          {cart?.map((pro,index) => (
            <div className={styles.product} key={index}>
              <div className={styles.image}>
                <Image src={pro.image} height="80" width="65" />
              </div>
              <p>{pro.title}</p>
              <p>{pro.price}kr</p>
              <p>{pro.quantity}</p>
              <div className={styles.buttons}>
                <button onClick={() => dispatch(updateCart({ operation: 'increaseQty', productId: pro.id }))}>+</button>
                <button onClick={() => decreaseQty(pro)}> -</button>
                <button onClick={() => removeProduct(pro.id)}>x</button>
              </div>
              <p>{Math.round(pro.quantity * pro.price * 100) / 100}kr</p>
            </div>
          ))}
          </div>
          <h2 className={styles.totalCost}>
            <div>Total cost (incl.VAT): </div>
            <div>{getTotalPrice()}kr</div>
          </h2>
            <button onClick={handleCheckout} className={styles.chekoutBtn}>CHECK OUT</button>
            
        </>
      )}
    </div>
  );
};

export default CartPage;



  
 
