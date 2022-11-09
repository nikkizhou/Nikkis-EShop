import Link from 'next/link';
import styles from '../styles/Navbar.module.css'
import { useSelector } from 'react-redux';

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const cartDisplay = 'Cart🛒' + cart.length 
  
  return (
    <nav className={styles.navbar}>
      <h6 className={styles.logo}>Nikki's Eshop</h6>
      <ul className={styles.links}>
        <li className={styles.navlink}> <Link href="/">Home</Link> </li>
        <li className={styles.navlink}> <Link href="/products">Products</Link> </li>
        <li className={styles.navlink}> <Link href="/cart">{ cartDisplay}</Link></li>
        <li className={styles.navlink}> <Link href="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
