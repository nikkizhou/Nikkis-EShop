
import axios from 'axios'
import { baseUrl } from '../config/baseURL_config';
import { Product, Review, UserI } from '../interfaces';
import { updateUser } from '../redux/actions/userActions';

// const tryCatchWrapper = async (callback: any) => {
//   try {
//     return await callback()
//   } catch (error) {
//     console.log(error.message)
//   }
// }


//----------------------------User Api-------------------------

export const findUserInDb = async (user: any) => {
  return await axios.get('/api/user', { params: user })
    .then(data => data.data)
    .catch(err => console.log(err.message))
}

export const updateUserInDb = async (user: UserI) => {
  return await axios.put('/api/user', user)
    .then(data => data.data)
    .catch(err => console.log(err.message))
}

//----------------------------Orders Api-------------------------

export const fetchOrders = async (setOrders:Function,userId:string) => {
  await axios.get('/api/orders', { params: { userId } })
  .then(res => setOrders(res.data))
  .catch(error => console.log(error))
}

export const markOrderAsRated = async (orderId:string) =>
  await axios.put('/api/orders', { id: orderId, rated: true })
    .catch(err => console.log(err.message))


export const addOrderToDb = async (setAlertStatus:Function, cart:any) => {
  return await axios.post('api/orders', cart)
    .then((orderNr) => {
      setAlertStatus('Success')
      return orderNr.data
    })
    .catch(err => setAlertStatus({ error: err.message }))

}

//----------------------------Reviews Api-------------------------

export const fetchReviews = async (setReviews:Function, id: string) => {
  await axios.get(`${baseUrl}/api/reviews`, { params: { productId: id } })
    .then((res) => setReviews(res.data))
    .catch(err => console.log(err))
}

export const addReview = async (review: Review) => {
  await axios.post(`${baseUrl}/api/reviews`, review)
    .catch(err => { throw err })
}


//----------------------------Cart Api-------------------------------

export const getCartFromDb = async (userId:string) => {
  return await axios.get('/api/cart', { params: { userId } })
    .then(data => data.data)
    .catch(err => console.log(err.message));
}

export const updateCartInDb = async (operation:string, productId:number, userId:string) => {
  return await axios.put('/api/cart', { operation, productId, userId })
    .then(data => data.data)
    .catch(err => console.log(err.message))
}


//----------------------------aws upload image Api-------------------------

export const getImgURL = async (fileType: string, fileName: string, user: UserI,dispatch:Function) => {
  await axios
    .post('/api/uploadImg', {
      fileName: fileName,
      fileType: fileType,
      id: user.id
    })
    .then(res => dispatch(updateUser({ ...user, image: res.data.url })))
    .catch(error => console.log("Error on uploading image: " + error.message));
}
