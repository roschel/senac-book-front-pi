export type User = {
    id: number;
    cpf:string
    name: string;
    login: string;
    password: string;
    status: boolean;
    role: Role;
}

export type Role = {
    id: number;
    authority: string;
}

export type UsersResponse = {
    content: User[];
    totalPages: number;
  }