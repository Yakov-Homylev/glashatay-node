import { Document, Model } from 'mongoose';

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export enum Roles {
    User = 'user',
    Moderator = 'moderator',
    Admin = 'admin',
}

export interface IUser extends Document {
    id: string;
    login: string;
    password: string;
    refreshToken?: string;
    role: Roles;
    username: string;
    about?: string;
    createdAt: Date;
}

export interface IUserMethods {
    checkPassword(password: string): Promise<boolean>;
    setPassword(password: string): Promise<void>;
}

export type TUserModel = Model<IUser, {}, IUserMethods>;

export interface LoginData {
    login: string;
    password: string;
    role: Roles;
}
