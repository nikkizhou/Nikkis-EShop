import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import {UserI} from '../global.d.'
import { getUser,updateUser } from './actions/userActions'

// interface State {
//   isLoading: boolean
//   user: UserI|null
//   error: string | null
// }

const initialState = {
  isLoading: false,
  user: {}, 
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload 
    })
    builder.addCase(getUser.rejected, (state, action) => {
      state.user = null
      state.error = action.error.message
    })
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload
    })
    builder.addCase(updateUser.rejected, (state, action) => {
      state.user = null
      state.error = action.error.message
    })
  },
})




//export const {} = userSlice.actions;



export default userSlice.reducer
