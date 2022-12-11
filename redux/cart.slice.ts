import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../interfaces'
import axios from 'axios'
import { useUser } from '@auth0/nextjs-auth0';
import { getCart, updateCart } from './actions/cartActions'

interface State{
  loading: boolean
  cart: Product[],
  error: string|null
}

const cartSlice = createSlice({
  name: 'cart',
  initialState:{loading:true,cart:[],error:null},
  reducers: {
    addToCart: (state: State, action) =>{
      //const newCartItem = axios.put('/api/cart/', null, { params: { operation: 'addProduct', productId: }});
      const itemExists: Product | undefined = state.cart.find((item: Product) => item.id === action.payload.id);
      itemExists ? itemExists.quantity++ : state.cart.push({ ...action.payload, quantity: 1 })
    },

    incrementQuantity: (state: State, action) => {
      const item: Product | undefined = state.cart.find((item: Product) => item.id === action.payload);
      item.quantity++;
    },

    decrementQuantity: (state: State, action) => {
      const item:Product| undefined = state.cart.find((item: Product) => item.id === action.payload);
      if (item?.quantity == 1) {
        const index:number|undefined = state.cart.findIndex((item) => item.id === action.payload);
        state.cart.splice(index, 1);
      } else {
        item.quantity--;
      }
    },

    removeFromCart: (state: State, action) => {
      const index: number | undefined = state.cart.findIndex((item: Product) => item.id === action.payload);
      state.cart.splice(index, 1);
    },
  },
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
  },
});

export default cartSlice.reducer;

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} = cartSlice.actions;
