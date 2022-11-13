import { createSlice } from '@reduxjs/toolkit';
import {Product} from '../interfaces'

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state:Product[], action) => {
      const itemExists: Product | undefined = state.find((item: Product) => item.id === action.payload.id);
      itemExists ? itemExists.quantity++ : state.push({ ...action.payload, quantity: 1 })
    },

    incrementQuantity: (state: Product[], action) => {
      const item: Product | undefined = state.find((item: Product) => item.id === action.payload);
      item.quantity++;
    },

    decrementQuantity: (state: Product[], action) => {
      const item:Product| undefined = state.find((item: Product) => item.id === action.payload);
      if (item?.quantity == 1) {
        const index:number|undefined = state.findIndex((item) => item.id === action.payload);
        state.splice(index, 1);
      } else {
        item.quantity--;
      }
    },

    removeFromCart: (state: Product[], action) => {
      const index: number | undefined = state.findIndex((item: Product) => item.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} = cartSlice.actions;
