import { createSlice, createAsyncThunk, AsyncThunkAction } from '@reduxjs/toolkit';
import axios from 'axios'
import { UserI } from '../../interfaces';
import { findUserInDb, updateUserInDb } from '../../utils/apiCalls'

export const getUser = createAsyncThunk(
  'user/getUser',
  async (user: UserI) => {
    const{email,name} = user || {}
    return user && await findUserInDb({ email, name }) 
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: UserI) =>  await updateUserInDb(user)
)
