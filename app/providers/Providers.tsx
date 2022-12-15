"use client";

import { PropsWithChildren } from "react";
import ReduxProvider from "./ReduxProvider";
import { UserProvider, useUser } from '@auth0/nextjs-auth0';
import { updateUser, getUser } from '../../redux/actions/userActions';
import { getCart } from '../../redux/actions/cartActions'
import { useDispatch, useSelector } from 'react-redux';
import store, { AppDispatch } from '../../redux/store';

type P = PropsWithChildren;

export default function Providers({ children }: P) {
  // const dispatch = useDispatch<AppDispatch>();
  // const authUser = useUser().user

  // dispatch(getUser(authUser))
  // dispatch(getCart())

  return ( 
    <>
      <ReduxProvider>
        <UserProvider>
          {children}
        </UserProvider>
      </ReduxProvider>
    </>
  );
}
