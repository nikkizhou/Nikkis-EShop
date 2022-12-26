import { createSlice, createAsyncThunk, AsyncThunkAction } from '@reduxjs/toolkit';
import axios from 'axios'
import { UserI } from '../../interfaces';

export const getUser = createAsyncThunk(
  'user/getUser',
  async (user: UserI) => {
    const{email,name} = user || {}
    const data = user && await axios.get('/api/user', { params: { email, name } })
      .then(data => data.data)
      .catch(err => console.log(err.message));
    return data; 
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: UserI) => {
    const newUser = await axios.put('/api/user', user)
      .then(data => data.data)
      .catch(err => console.log(err.message))
    return newUser
  }
)
