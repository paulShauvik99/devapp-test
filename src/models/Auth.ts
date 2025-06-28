export interface AuthUser {
    id: string;
    email: string;
    username: string;
    name: string;
    avatar?: string;
    role: UserRole;
    isVerified: boolean;
}


export const UserRole = {
    USER: 'user',
    ADMIN: 'admin',
    MODERATOR: 'moderator'
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

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
    user: AuthUser;
    token: string;
    refreshToken: string;
    expiresIn: number;
}

export interface ResetPasswordInput {
    token: string;
    password: string;
    confirmPassword: string;
}

export interface ChangePasswordInput {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}