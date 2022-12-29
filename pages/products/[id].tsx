import React,{useState,useEffect} from 'react'
import Image from 'next/image';
import styles from '../../styles/Product.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { Product, Review, UserI } from '../../interfaces'
import { prisma } from '../../prisma/prismaClient'
import { updateCart } from '../../redux/actions/cartActions';
import ReviewForm from '../../components/productsPage/ReviewForm';
import ReviewList from '../../components/productsPage/ReviewList';
import { useRouter } from 'next/router'
import axios from 'axios';
import { RootState } from '../../redux/store';
import { baseUrl } from '../../config/baseURL_config';


function Product({product}: {product: Product}) {
  const user: UserI = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()
  const {id,editing,orderId} = router.query

  const [editReview, setEditReview] = useState(false)
  const [reviews, setReviews] = useState([])

  useEffect(() => {editing && setEditReview(true)})
  useEffect(() => { fetchReviews() })
  
  const fetchReviews = async () => {
    await axios.get(`${baseUrl}/api/reviews`,{params:{productId: id}})
      .then((res) => setReviews(res.data))
      .catch(err => console.log(err))
  }
  
  const addReview = async (newReview: Review) => {
    const newReviewComplete = {
      ...newReview,
      rating: Number(newReview.rating),
      productId: Number(id),
      userId: user.id
    }
    setReviews([...reviews,newReviewComplete])
    await axios.post(`${baseUrl}/api/reviews`, newReviewComplete)
      .catch(err => {throw err})
    return await fetchReviews()
  }

  const closeReviewEditing = () => setEditReview(false)
  const addToCart = () => dispatch(
    updateCart({
      operation: 'increaseQty',
      pro:product
    }))
  

  return (
    <div className={styles.product}>
      <h1>{product.title}</h1>
      <Image
        src={product.image}
        alt={product.title} width={200} height={200}
        className={product.image}
      ></Image>
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
        addReview={addReview}
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
