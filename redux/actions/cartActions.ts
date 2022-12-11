
import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit';
import axios from 'axios'

interface ThunkAPI {
  dispatch: Function
  getState: Function
  extra?: any
  requestId: string
  signal: AbortSignal
}

interface Props {
  operation: string,
  productId: number
}

export const getCart: any = createAsyncThunk(
  'cart/getCart',
  async (thunkAPI: ThunkAPI) => {
    const userId = thunkAPI.getState().user.user.id
    console.log(userId, 'userId line 22 cartActions');

    const cart = await axios.get('api/cart', { params: { userId } })
      .then(data => data.data)
      .catch(err => console.log(err.message));
    return cart
  }
)

export const updateCart: any = createAsyncThunk(
  'cart/updateCart',
  async ({ operation, productId }:Props, thunkAPI:ThunkAPI) => {
    const userId = thunkAPI.getState().user.user.id
    // console.log(thunkAPI.getState().user,'thunk in line37 cartActions');
    // console.log(userId,'userId in line37 cartActions');
    
    const config = { headers: { 'Content-Type': 'application/json' }, }
    const newCart = await axios.put('/api/cart', { operation, productId, userId }, config)
      .then(data => data.data)
      .catch(err => console.log(err.message))
    return newCart
  }
)
