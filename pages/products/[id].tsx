import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateCart } from '../../redux/actions/cartActions';
import { RootState, AppDispatch } from '../../redux/store';
import { GetStaticProps, GetStaticPaths } from 'next'
import Image from 'next/image';
import { useRouter } from 'next/router'
import { prisma } from '../../prisma/prismaClient'
import { Product, Review, UserI } from '../../interfaces'
import styles from '../../styles/Product.module.css'
import ReviewForm from '../../components/productsPage/ReviewForm';
import ReviewList from '../../components/productsPage/ReviewList';
import {fetchReviews,addReview} from '../../utils/apiCalls'

function Product({product}: {product: Product}) {
  const user: UserI = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()
  const {id,editing,orderId} = router.query

  const [editReview, setEditReview] = useState(false)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    editing && setEditReview(true)
    fetchReviews(setReviews,(id as string))
  }, [])
  
  
  const addReviewWrapper = async (newReview: Review) => {
    const newReviewComplete = {
      ...newReview,
      rating: Number(newReview.rating),
      productId: Number(id),
      userId: user.id
    }
    setReviews([...reviews, newReviewComplete])
    await addReview(newReviewComplete)
    return await fetchReviews(setReviews,(id as string))
  }

  const closeReviewEditing = () => setEditReview(false)
  const addToCart = () => dispatch(
    updateCart({operation: 'increaseQty',pro:product
    }))
  

  return (
    <div className={styles.product}>
      <h1>{product.title}</h1>

      <Image
        src={product.image}
        alt={product.title} width={200} height={200}
        className={product.image}
      />

      <p><span className={styles.price}>{product.price}kr/stk</span>  </p>
      <button className='buttonM' onClick={addToCart}>
        Add to Cart 🛒
      </button>
      <h3>Description</h3>
      <p className={styles.category}> Category: {product.category}</p>
      <p>{product.description}</p>

      <ReviewList reviews={reviews} />

      {editReview
        && <ReviewForm
        addReview={addReviewWrapper}
        closeReviewEditing={closeReviewEditing}
        orderId={orderId as string}
      />}
    </div>
  )
}


//generate generate dynamic routing page statically with getStaticPaths() and getStaticProps()
export const getStaticPaths: GetStaticPaths = async () => {
  const products = await prisma.product.findMany()
  const paths = products.map((pro: Product) => ({ params: { id: pro.id.toString() }}))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = await prisma.product.findUnique({ where: { id: Number(params.id) } })
  return { props: { product } }
}

export default Product
