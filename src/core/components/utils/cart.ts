import { Product } from "../types/Product";

export type ProductsCart = {
  product:Product;
  sellQuantity: number;
}

export type CartSession = {
  products: ProductsCart[];
  customerId?: number
}

export const getCartData = () => {
  const cartData = localStorage.getItem("cartData") ?? '{}';
  const parsedCartData = JSON.parse(cartData);
  return parsedCartData as CartSession;
}

export const saveCartData = (cart: CartSession) => {
  localStorage.setItem("cartData", JSON.stringify(cart));
}