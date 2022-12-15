
import { createSlice, createAsyncThunk, AsyncThunkAction } from '@reduxjs/toolkit';
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
  productId: number,
}

export const getCart = createAsyncThunk(
  'cart/getCart',
  async (_,thunkAPI: ThunkAPI) => {
    const userId = thunkAPI.getState().user.user.id
    const cart = await axios.get('http://localhost:3000/api/cart', { params: { userId } })
      .then(data => data.data)
      .catch(err => console.log(err.message));
    return cart
  }
)
//
export const updateCart = createAsyncThunk(
  'cart/updateCart',
  async ({ operation, productId }: Props, thunkAPI: ThunkAPI) => {
    const userId = thunkAPI.getState().user.user.id
    const reqBody = { operation, productId, userId }
    const newCart = await axios.put('/api/cart', reqBody)
      .then(data => data.data)
      .catch(err => console.log(err.message))
    
    return newCart
  }
)
