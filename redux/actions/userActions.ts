import { createSlice, createAsyncThunk, AsyncThunkAction } from '@reduxjs/toolkit';
import axios from 'axios'
import { UserI } from '../../interfaces';

export const getUser:any = createAsyncThunk(
  'user/getUser',
  async (user: UserI) => {
    const{email,name} = user
    const data = user && await axios.get('/api/user', { params: { email, name } })
      .then(data => data.data)
      .catch(err => console.log(err.message));
    return data; 
  }
)

export const updateUser: any = createAsyncThunk(
  'user/updateUser',
  async (user: UserI) => {
    const config = {headers: {'Content-Type': 'application/json'}, }
    const newUser = await axios.put('/api/user', user, config)
      .then(data => data.data)
      .catch(err => console.log(err.message))
    return newUser
  }
)
