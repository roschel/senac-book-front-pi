import { Payment } from "../utils/cart"
import { Product } from "./Product"

export type Client = {
  id: number;
  firstName: string;
  lastName: string;
  cpf: string;
  login: string;
  password: string;
  status: boolean;
  address: Address[];
}

export type Address = {
  id: number;
  zipCode: string;
  address: string;
  number: number;
  addressComplement: string;
  city: string;
  state: string;
  neighborhood: string;
  payment: boolean;
  status: boolean
}

