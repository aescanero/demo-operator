export interface UserInfo {
    sub: string;
    name: string;
    email: string;
    picture?: string;
    groups?: string[];
}

export interface Identity {
    id: string;
    fullName: string;
    email: string;
    avatar?: string;
}