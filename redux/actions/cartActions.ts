
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
  productId: number,
  userId: string
}

export const getCart: any = createAsyncThunk(
  'cart/getCart',
  async (_,thunkAPI: ThunkAPI) => {
    const userId = thunkAPI.getState().user.user.id
    const cart = await axios.get('api/cart', { params: { userId } })
      .then(data => data.data)
      .catch(err => console.log(err.message));
    return cart
  }
)
//
export const updateCart: any = createAsyncThunk(
  'cart/updateCart',
  async ({ operation, productId }: Props, thunkAPI: ThunkAPI) => {
    const userId = thunkAPI.getState().user.user.id
    const reqBody = { operation, productId, userId }
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
    }

    const newCart = await axios.put('/api/cart',reqBody , config)
      .then(data => data.data)
      .catch(err => console.log(err.message))
  
    return newCart
  }
)
