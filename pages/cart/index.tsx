import React,{useEffect} from 'react'
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../../styles/CartPage.module.css';
import { Cart, Product, UserI } from '../../interfaces'
import { getCart, updateCart } from '../../redux/actions/cartActions';
import { RootState } from '../../redux/store';

const CartPage = () => {
  const dispatch = useDispatch()
  const cart: Cart = useSelector((state: RootState) => state.cart.cart);
  //const user: UserI = useSelector((state: RootState) => state.user.user);
  console.log(cart, 'cart in line 13 in page/cart ');

  const decreaseQty = (pro: Product) => {
    pro.quantity === 1
      ? removeProduct(pro)
      : dispatch(updateCart({ operation: 'decreaseQty', productId: pro.id }))
  }

  const removeProduct = (pro: Product) => 
    dispatch(updateCart({ operation: 'removeProduct', productId: pro.id }))
  
  const handleCheckOut = () => {
    
  }
  
  const getTotalPrice:Function = () => {
    const price:number = cart?.reduce((accumulator, pro) => accumulator + pro.quantity * pro.price, 0)
    return Math.round(price * 100) / 100        
  };

  return (
    <div className={styles.container}>
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
                <button onClick={() => dispatch(updateCart({ operation: 'increaseQty', productId: pro.id }))}>
                  +
                </button>
                <button onClick={() => decreaseQty(pro)}>
                  -
                </button>
                <button onClick={() => removeProduct(pro)}>
                  x
                </button>
              </div>
              <p>{Math.round(pro.quantity * pro.price * 100) / 100}kr</p>
            </div>
          ))}
          </div>
          <h2 className={styles.totalCost}>
            <div>Total cost (incl.VAT): </div>
            <div>{getTotalPrice()}kr</div>
          </h2>
            <button onClick={handleCheckOut} className={styles.chekoutBtn}>CHECK OUT</button>
        </>
      )}
     
    </div>
  );
};

export default CartPage;



  
 
