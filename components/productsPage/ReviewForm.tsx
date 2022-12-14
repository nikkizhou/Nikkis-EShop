import React, { useState } from 'react'
import CusAlert from '../CusAlert';
import ReactStars from 'react-stars'
import styles from '../../styles/Product.module.css'
import axios from 'axios';

interface Props{
  addReview: Function,
  closeReviewEditing: Function,
  orderId:string
}

function ReviewForm({ addReview, closeReviewEditing, orderId }: Props) {
  const closeAlert: Function = () => setAlertStatus('')
  const [alertStatus, setAlertStatus] = useState<string | { error: string }>();
  const [review, setReview] = useState({ rating: 0, text: '' })

  const markOrderAsRated = async () => {
    return await axios.put('http://localhost:3000/api/orders', { id:orderId, rated:true })
    .catch(err=>console.log(err))
  }

  const addReviewToDb = async () => {
    await addReview(review)
      .then(() => setAlertStatus('Success'))
      .catch((err: Error) => {
        setAlertStatus({ error: err.message })
        console.log(err.message);
      })
  }

  const submitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    closeReviewEditing()
    await markOrderAsRated()
    await addReviewToDb()
  }
  
  const message = {
    title: 'Review added',
    description: 'Thanks for your feedback!'
  }

  return ( 
      <form onSubmit={submitReview} className={styles.reviewForm}>
       {alertStatus && <CusAlert status={alertStatus} closeAlert={closeAlert} message={message} />}
        <ReactStars
          count={5}
          onChange={(newRating: number) => setReview({ ...review, rating: newRating })}
          size={48}
          activeColor="#ffd700" />

        <input
          type='text'
          name='text'
          value={review.text}
          onChange={(e) => setReview({ ...review, text: e.target.value })}
          placeholder='Write your reviews...' />
        
        <button type="submit" >
          Submit
        </button >
      </form >
  )
}
//<input type='number' name='rating' value={review.rating} onChange={editInput} placeholder='Rating' />

export default ReviewForm
