import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../../styles/CartPage.module.css';
import { Cart, Product, UserI } from '../../interfaces'
import { updateCart } from '../../redux/actions/cartActions';
import { RootState,AppDispatch } from '../../redux/store';
import CusAlert from '../../components/CusAlert'
import axios from 'axios';
import { useRouter } from 'next/router'
import { baseUrl } from '../../config/baseURL_config';

const CartPage = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const {cart, loading} = useSelector((state: RootState) => state.cart);
  const user: UserI = useSelector((state: RootState) => state.user.user);

  const closeAlert: Function = () => setAlertStatus('')
  const [alertStatus, setAlertStatus] = useState<string | {error:string}>();
  
  const addOrders = async () => {
    const cartNew = cart?.map((pro:Product) => ({ productId: pro.id, userId: user.id, quantity: pro?.quantity }))
    await axios.post('api/orders', cartNew)
      .then(() => setAlertStatus('Success'))
      .catch(err => setAlertStatus({ error: err.message }))
  }

  const handleCheckout = async () => {
    if (!user) return router.push(`${baseUrl}/api/auth/login`)
   
    await addOrders()
    cart.map((pro: Product) => dispatch(updateCart({ operation: 'removeProduct', pro })))
  }
  
  const getTotalPrice:Function = () => {
    const price:number = cart?.reduce((accumulator:number, pro) => accumulator + pro?.quantity * pro?.price, 0)
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
                <Image src={pro?.image} height="80" width="65" alt='product'/>
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



  
 
