import React, { useState } from 'react'
import ReactStars from 'react-rating-stars-component'
import styles from '../../styles/Product.module.css'
import axios from 'axios';
import { baseUrl } from '../../config/baseURL_config';

interface Props{
  addReview: Function,
  closeReviewEditing: Function,
  orderId:string
}

function ReviewForm({ addReview, closeReviewEditing, orderId }: Props) {
  const [review, setReview] = useState({ rating: 0, text: '' })

  const markOrderAsRated = async () => {
    return await axios.put(`${baseUrl}/api/orders`, { id:orderId, rated:true })
    .catch(err=>console.log(err.message))
  }

  const addReviewToDb = async () => {
    await addReview(review)
      .catch((err: Error) => console.log(err.message))
  }

  const submitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    closeReviewEditing()
    await addReviewToDb()
    await markOrderAsRated()
  }


  return ( 
      <form onSubmit={submitReview} className={styles.reviewForm}>
        <ReactStars
          count={5}
          onChange={(newRating: number) => setReview({ ...review, rating: newRating })}
          size={48}
          isHalf={true}
          activeColor="#ffd700" />

        <textarea
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
