import React from 'react'
import { Review } from '../../interfaces'
import styles from '../../styles/ReviewList.module.css'
import ReactStars from 'react-rating-stars-component'

interface Props{
   reviews: Review[] 
}

function ReviewList({ reviews }: Props) {
  return (
    <div className={styles.reviewList}>
      <h3>Reviews</h3>

      {reviews?.map((review: Review, index) => {
        const time = review.assignedAt?.replace('T', '__').substring(0, 19) 
        const user = review.userId?.substring(0, 5) + '*******'
     
        return (<div className={styles.reviewCard} key={index}>
          <ReactStars
            value={review.rating}
            count={5}
            edit={false}
            size={24}
            isHalf ={true}
          />
          <div> {review.text}</div>
          <div className={styles.stamp}>
            <div>{time}</div>
            <div>User: {user}</div>
          </div>
        </div>)
      }
        
      )}
    </div>
  )
}

export default ReviewList
