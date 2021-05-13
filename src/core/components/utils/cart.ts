import { Address } from "../types/Client";
import { Product } from "../types/Product";

export type Payment = {
  id: number;
  payment: string;
  numberCard: string;
  validThru: number;
  cvv: number;
  plots: number;
  status: boolean;
}

export type ProductsCart = {
  product: Product;
  sellQuantity: number;
}

export type CartSession = {
  products: ProductsCart[];
  customerId?: number;
  address?: Address;
  payment?: Payment;
  paymentMethod?: string;
  value?: number;
  shipping?: number;
  totalValue?: number;
}

export const getCartData = () => {
  const cartData = localStorage.getItem("cartData") ?? '{}';
  const parsedCartData = JSON.parse(cartData);
  return parsedCartData as CartSession;
}

export const saveCartData = (cart: CartSession) => {
  localStorage.setItem("cartData", JSON.stringify(cart));
}

export const calculateShipping = (city: string, state: string) => {  
  if (state.toLowerCase() === 'sp') {
    if (city.toLowerCase() === 'são paulo') {
      return 10;
    } else {
      return 15;
    }
  } else {
    return 30;
  }
}
