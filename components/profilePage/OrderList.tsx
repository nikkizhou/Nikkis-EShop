import React, { useState,useEffect } from 'react'
import styles from '../../styles/Orders.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { Product, UserI,Order } from '../../interfaces';
import { RootState } from '../../redux/store';


import { fetchOrders } from '../../utils/apiCalls'
import OrderCard from './OrderCard';

function OrderList() {
  const user: UserI = (useSelector((state: RootState) => state.user.user))
  const userId = user?.id
  const [orders, setOrders] = useState<Order[]>()
  
  useEffect(() => {fetchOrders(setOrders, userId) }, [])

  return (
    <div className={styles.order_container}>
      <h1>Shopping History</h1>
      {orders?.map((order, index) =>
        <OrderCard order={order} key={index} />)}
    </div>
  )
}

export default OrderList
