import React, { useState } from 'react'
import ReactStars from 'react-rating-stars-component'
import styles from '../../styles/Product.module.css'
import { markOrderAsRated } from '../../utils/apiCalls'

interface Props{
  addReview: Function,
  closeReviewEditing: Function,
  orderId:string
}

function ReviewForm({ addReview, closeReviewEditing, orderId }: Props) {
  const [review, setReview] = useState({ rating: 0, text: '' })

  const addReviewToDb = async () => 
    await addReview(review)
      .catch((err: Error) => console.log(err.message))
  
  const submitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    closeReviewEditing()
    await addReviewToDb()
    await markOrderAsRated(orderId)
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
        
        <button type="submit" className='buttonS'>
          Submit
        </button >
      </form >
  )
}
//<input type='number' name='rating' value={review.rating} onChange={editInput} placeholder='Rating' />

export default ReviewForm
