export type User = {
    id: number;
    name: string;
    cpf:string
    login: string;
    password: string;
    status: boolean;
    zipCode: string;
    address: string;
    number: number;
    addressComplement: string;
    city: string;
    state: string;
    country: string;
    roles: Roles[];
}

export type Roles = {
    id: number;
    authority: string;
}

export type UsersResponse = {
    content: User[];
    totalPages: number;
  }