import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styles from '../../styles/CartPage.module.css';
import { Cart, Product, UserI } from '../../interfaces'
import { updateCart } from '../../redux/actions/cartActions';
import { RootState,AppDispatch } from '../../redux/store';
import CusAlert from '../../components/CusAlert'
import CheckoutForm from '../../components/CheckoutForm';
import Header from '../../components/cartPage/Header';
import CartProductList from '../../components/cartPage/CartProductList';
import PriceInfo from '../../components/cartPage/PriceInfo';
import { addOrderToDb } from '../../utils/apiCalls'
import { orderMsgAuthenticated, orderMsgNotAuth } from '../../utils/alertMessage'

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { cart, loading } = useSelector((state: RootState) => state.cart);
  const user:UserI = useSelector((state: RootState) => state.user.user)
  
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [alertStatus, setAlertStatus] = useState<string | {error:string}>();
  const closeAlert: Function = () => setAlertStatus('')
  const closeCheckoutForm: Function = () => setShowCheckoutForm(false)
  
  
  const handleCheckout = async () => {
    if (user) return await realCheckout(user.id)  // if the user is logged in, checkout directly
    setShowCheckoutForm(true)                     // otherwise shows checkout form and handle checkout there
  }
  
  const realCheckout = async (userId: string) => {
    cart.forEach((pro: Product) => dispatch(updateCart({ operation: 'removeProduct', pro })))
    const cartNew = cart?.map((pro: Product) => ({ productId: pro.id, userId, quantity: pro?.quantity }))
    return await addOrderToDb(setAlertStatus, cartNew)
  }
  
  const message = user ? orderMsgAuthenticated : orderMsgNotAuth
  return (
    <div className={styles.container}>
      {alertStatus && <CusAlert status={alertStatus} closeAlert={closeAlert} message={message} />}
      {cart?.length === 0
        ? (<h1>Your Cart is Empty!</h1>)
        : ( <>
          <Header />
          <CartProductList cart={cart } />
          <PriceInfo cart={cart} />
          <button onClick={handleCheckout} className={`${styles.chekoutBtn} buttonM`}>CHECK OUT</button>
        </>)}
      
      {showCheckoutForm && <CheckoutForm
        closeCheckoutForm={closeCheckoutForm}
        realCheckout={realCheckout}
        cart={ cart } />}
    </div>
  );
};

export default CartPage;



  
 
