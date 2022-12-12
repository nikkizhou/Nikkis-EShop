import Link from 'next/link';
import styles from '../styles/Navbar.module.css'
import { useSelector } from 'react-redux';
import { Cart } from '../interfaces'
import { useUser } from '@auth0/nextjs-auth0';

const Navbar = () => {
  const cart: Cart = useSelector((state: any) => state.cart.cart);
  const NrProduct = cart.reduce(
    (accumulator, pro) => accumulator + pro.quantity, 0
  )
  const cartDisplay: string = 'Cart🛒' + NrProduct
  const { user, error, isLoading } = useUser();
  
  return (
    <>
    <nav className={styles.navbar}>
      <h6 className={styles.logo}>Nikki's Eshop</h6>
      <ul className={styles.links}>
        <li className={styles.navlink}> <Link href="/">Home</Link> </li>
        <li className={styles.navlink}> <Link href="/products">Products</Link> </li>
        <li className={styles.navlink}> <Link href="/cart">{ cartDisplay}</Link></li>
        <li className={styles.navlink}> <Link href="/contact">Contact</Link></li>
        <li className={styles.navlink}>
          {!isLoading && !user && (
            <div className={styles.btn}><Link href="/api/auth/login">Log in</Link></div>
        )}

          {!isLoading && user && (
              <div className={styles.proNLogout}>
              <div className={styles.navlink}> <Link href="/profile">Profile</Link></div>
              <div className={styles.btn}> <Link href="/api/auth/logout">Log out</Link></div>
            </div>
          )}</li>
          
      </ul>
    </nav>
    </>
  );
};

export default Navbar;
