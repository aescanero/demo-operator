export interface User {
    id: string;
    fullName: string;
    email: string;
    avatar?: string;
}

export interface AuthTokens {
    access_token: string;
    id_token?: string;
    refresh_token?: string;
}