import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCart, updateCart } from './actions/cartActions'


const cartSlice = createSlice({
  name: 'cart',
  initialState:{loading:true,cart:[],error:null},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCart.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.loading = false
      state.cart = action.payload
    })
    builder.addCase(getCart.rejected, (state,action) => {
      state.loading = false
      state.error = action.error.message
    })
    builder.addCase(updateCart.pending, (state) => {
      state.loading = true
    })
    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.loading = false
      state.cart =action.payload
    })
    builder.addCase(updateCart.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  },
});



export default cartSlice.reducer;
