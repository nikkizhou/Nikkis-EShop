2
import React from 'react'
import styles from '../styles/CheckoutForm.module.css'
import { Product, UserI } from '../interfaces';
import sendEmail from '../utils/sendEmail';
import {findUserInDb} from '../utils/apiCalls'

interface FormData {
  name: { value: string };
  email: { value: string };
  phone: { value: string };
  address: { value: string };
}

interface Props{
  closeCheckoutForm:Function,
  realCheckout: Function,
  cart: Product[]
}

function CheckoutForm({ closeCheckoutForm, realCheckout,cart }: Props) {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, phone, address } = e.target as typeof e.target & FormData
    const user = { name: name.value, email: email.value, phone: Number(phone.value), address: address.value }
    // if not logged in, find the user with email or create a user in db first
    const userDb:UserI = await findUserInDb(user)
    const orderNr = await realCheckout(userDb.id)
    await sendEmail({ ...user, products: cart, orderNr })
    closeCheckoutForm()
  };


  return (
    <div className={styles.container}>
      <button className={styles.closeBtn} onClick={() => closeCheckoutForm()}>X</button>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input  type="text" id="name" placeholder="Name" required />
        <input  type="email" id="email" placeholder="Email" required />
        <input  type="number" id="phone" placeholder="Phone" required />
        <input  type="text" id="address" placeholder="Address" required />
        <button className='buttonS' type="submit" >Check Out</button>
      </form>
    </div>
  )
}

export default CheckoutForm
