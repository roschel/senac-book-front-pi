import { Product } from "../types/Product";

export type ProductsCart = {
  product:Product;
  sellQuantity: number;
}

export const getCartData = () => {
  const cartData = localStorage.getItem("cartData") ?? '[]';
  const parsedCartData = JSON.parse(cartData);
  return parsedCartData as ProductsCart[];
}

export const saveCartData = (cart: ProductsCart[]) => {
  localStorage.setItem("cartData", JSON.stringify(cart));
}