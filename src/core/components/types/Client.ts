import { type } from "node:os"

export type Client = {
    id: number;
    fistName: string;
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
    country: string;
}