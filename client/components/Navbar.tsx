import Link from 'next/link';
import styles from '../styles/Navbar.module.css'
import { useSelector } from 'react-redux';
import { Cart } from '../interfaces'
import { useAuth0 } from '@auth0/auth0-react';


const Navbar = () => {
  const cart: Cart = useSelector((state: {cart: Cart}) => state.cart);
  const cartDisplay: string = 'Cart🛒' + cart.length  
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();
  
  return (
    <>
    <nav className={styles.navbar}>
      <h6 className={styles.logo}>Nikki's Eshop</h6>
      <ul className={styles.links}>
        <li className={styles.navlink}> <Link href="/">Home</Link> </li>
        <li className={styles.navlink}> <Link href="/products">Products</Link> </li>
        <li className={styles.navlink}> <Link href="/cart">{ cartDisplay}</Link></li>
        <li className={styles.navlink}> <Link href="/contact">Contact</Link></li>
        <li className={styles.navlink}> <Link href="/profile">Profile</Link></li>
        <li className={styles.navlink}>
          {!isLoading && !user && (
          <button
            className={styles.btn}
            onClick={() => loginWithRedirect()}
          >Log in</button>
        )}

          {!isLoading && user && (
            <button
              className={styles.btn}
              onClick={() => logout()}
            >Log out</button>
          )}</li>
          
      </ul>
    </nav>
    </>
  );
};

export default Navbar;
