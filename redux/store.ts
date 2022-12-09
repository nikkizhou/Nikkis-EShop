import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'
import cartReducer from './cart.slice';
import userReducer  from './user.slice';

const reducer = {
  cart: cartReducer,
  user: userReducer
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export default store;
