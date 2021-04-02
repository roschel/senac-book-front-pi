export type User = {
    id: number;
    cpf:string
    name: string;
    login: string;
    password: string;
    status: boolean;
    address: Address;
    roles: Role[];
}

export type Role = {
    id: number;
    authority: string;
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

export type UsersResponse = {
    content: User[];
    totalPages: number;
  }