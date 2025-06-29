import type { User } from "./User";

export interface LoginInput {
    email: string;
    password: string;
}

export interface RegisterInput {
    email: string;
    username: string;
    name: string;
    password: string;
    confirmPassword: string;
}

export interface AuthResponse {
    user: User;
    token: string;
    expiresIn: number;
}
