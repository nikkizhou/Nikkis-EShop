import React from 'react'
import { Review } from '../../interfaces'
import styles from '../../styles/ReviewList.module.css'
import ReactStars from 'react-stars'

interface Props{
   reviews: Review[] 
}

function ReviewList({ reviews }: Props) {
  
  return (
    <div className={styles.reviewList}>
      <h3>Reviews</h3>
      {reviews?.map((review: Review, index) => {
        const time = review.assignedAt?.replace('T', '__').substring(0, 19) 
        const user = review.userId?.substring(0,5)+'*******'
        return (<div className={styles.reviewCard} key={index}>
          <ReactStars
            count={5}
            edit={false}
            value={review.rating}
            size={24}
            color={'#ffd700'} />
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
