import { Cart } from "../interfaces";

export const getCartFromLS = () => {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const cart = window.localStorage.getItem('cart')
    return cart ? JSON.parse(cart) : [];
  }
  catch (e) {
    console.log(e)
  }
}
  
export const setCartToLS = (newCart:Cart) => {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem('cart', JSON.stringify(newCart));
    }
  } catch (error) { console.log(error) }
};
  


 
