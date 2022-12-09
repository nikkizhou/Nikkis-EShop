import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import {incrementQuantity,decrementQuantity,removeFromCart,} from '../../redux/cart.slice';
import styles from '../../styles/CartPage.module.css';
import { Cart } from '../../interfaces'
import { useUser } from '@auth0/nextjs-auth0';

const CartPage = () => {
  const cart: Cart = useSelector((state: { cart: Cart }) => state.cart);
  const dispatch = useDispatch();
  const { user, error, isLoading } = useUser();
  console.log(user,'user in line 13 in cart');
  
  const getTotalPrice:Function = () => {
    const price:number = cart.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0)
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
          {cart.map((item) => (
            <div className={styles.body}>
              <div className={styles.image}>
                <Image src={item.image} height="80" width="65" />
              </div>
              <p>{item.title}</p>
              <p>{item.price}kr</p>
              <p>{item.quantity}</p>
              <div className={styles.buttons}>
                <button onClick={() => dispatch(incrementQuantity(item.id))}>
                  +
                </button>
                <button onClick={() => dispatch(decrementQuantity(item.id))}>
                  -
                </button>
                <button onClick={() => dispatch(removeFromCart(item.id))}>
                  x
                </button>
              </div>
              <p>{Math.round(item.quantity * item.price * 100) / 100}kr</p>
            </div>
          ))}
          <h2>Grand Total: {getTotalPrice()}kr</h2>
        </>
      )}
    </div>
  );
};

export default CartPage;
