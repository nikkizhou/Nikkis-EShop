import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import styles from '../../styles/Orders.module.css'
import { useRouter } from 'next/router'

function OrderCard({ order }) {
  const router = useRouter()
  const { product: { image, title, price }, quantity, assignedAt, orderNr, productId, id, rated } = order
  const time = assignedAt.replace('T', '__').substring(0, 20)

  return (
    <div className={styles.order_card} >
      <div className={styles.product}>
        <Image src={image} width={100} height={100} alt='' />
        <div className={styles.text}>
          <Link href={`/products/${productId}`}>
            <a className={styles.title}>{title}</a>
          </Link>
          <div className={styles.price}>
            <h3>{quantity}stk</h3>
            <h3>{price}kr</h3>
            <h3>Total: {quantity * price}kr</h3>
          </div>
        </div>
      </div>
      <div className={styles.orderInfo}>
        <div>{time}</div>
        <div>OrderNr: {orderNr}</div>
        <button
          disabled={rated}
          onClick={() => router.push(`/products/${productId}?orderId=${id}&editing=true`)}
          className={rated ? styles.disabledBtn : `${styles.rateBtn} buttonM`}>Rate</button>
      </div>
    </div>
  )
}

export default OrderCard
