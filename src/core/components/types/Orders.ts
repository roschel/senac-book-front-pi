import { Payment } from "../utils/cart";
import { Address, Client } from "./Client";
import { Product } from "./Product";

export type Orders = {
  id: number;
  value: number;
  shipping: number;
  totalValue: number;
  status: boolean;
  client: Client;
  address: Address;
  payment: Payment;
  createdAt: string;
  orderDetails: OrdersDetails[];
}

export type OrdersDetails={
  id: number;
  product: Product;
  sellQuantity: number;
}