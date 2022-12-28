import React, { useState,useEffect } from 'react'
import styles from '../../styles/Orders.module.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { Product, UserI,Order } from '../../interfaces';
import { RootState } from '../../redux/store';
import Image from 'next/image';
import { useRouter } from 'next/router'
import Link from 'next/link'

function Orders() {
  const router = useRouter()
  const user: UserI = (useSelector((state: RootState) => state.user.user))
  const userId = user?.id
  const [orders, setOrders] = useState<Order[]>()
  
  useEffect(() => {
    const fetchOrders = async () => {
      await axios.get('/api/orders', { params: { userId } })
        .then(res => setOrders(res.data))
        .catch(error=>console.log(error))
    }
    fetchOrders()
  }, [])


  return (
    <div className={styles.order_container}>
      <h1>Shopping History</h1>

      {orders?.map((order, index) => {
        const { product: { image, title, price }, quantity, assignedAt, orderNr, productId,id,rated } = order
        const time = assignedAt.replace('T', '__').substring(0, 20)
        
        return (
          <Link href={`/products/${productId}`} key={index}>
            <a className={styles.order_card} >
              <div className={styles.product}>
                <Image src={image} width={100} height={100} alt=''/>
                <div className={styles.text}>
                  <div className={styles.title}>{title}</div>
                  <div className={styles.price}>
                    <h3>{quantity}stk</h3>
                    <h3>{price}kr</h3>
                    <h3>Total: {quantity*price}kr</h3>
                  </div>
                </div>
              </div>
              <div className={styles.orderInfo}>
                <div>{time}</div>
                <div>Order Nr: {orderNr}</div>
                <button
                  disabled={rated}
                  onClick={() => router.push(`/products/${productId}?orderId=${id}&editing=true`)}
                  className={rated ? styles.disabledBtn : styles.rateBtn}>Rate</button>
                </div>
              </a>
      
          </Link>)
      }
      )}
    </div>
  )
}

export default Orders
