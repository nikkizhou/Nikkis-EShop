import { createSlice, createAsyncThunk, AsyncThunkAction } from '@reduxjs/toolkit';
import axios from 'axios'
import { UserI } from '../../interfaces';
import { useUser } from '@auth0/nextjs-auth0';


export const getUser:any = createAsyncThunk(
  'user/getUser',
  async (user: UserI, { rejectWithValue }) => {
    //const { user, error, isLoading } = useUser();
    const{email,name} = user
    const data = user && await axios.get('/api/user/getUser', { params: { email, name } })
      .then(data => data.data)
      .catch(err => console.log(err));
    
    return data; 
  }
)


export const updateUser: any = createAsyncThunk(
  'user/updateUser',
  async (user: UserI, { rejectWithValue }) => {
    const config = {headers: {'Content-Type': 'application/json'}, }
    try {
      await axios.put('/api/user/updateUser', user, config)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
