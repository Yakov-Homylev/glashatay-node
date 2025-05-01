import { Roles } from '@/types/user.types';
import { Schema } from 'mongoose';

export enum Category {
    Common = 'common',
    Search = 'search',
    Trade = 'trade',
    General = 'general',
}

export interface IAd {
    id: string;
    title: string;
    description: string;
    category: Category;
    createdBy: Schema.Types.ObjectId;
}

export interface IGetAdsFilter {
    categories?: string[];
    page?: number;
    limit?: number;
    query?: string;
}

export interface IGetAdsListResponse {
    ads: IAd[];
    totalCount: number;
}

export interface ICreateAdBody {
    title: string;
    description: string;
    category: Category;
}

export interface IEditBody {
    id: string;
    title?: string;
    description?: string;
}

export type GetAdsList = (filter: IGetAdsFilter) => Promise<IGetAdsListResponse>;
export type GetAd = (id: string) => Promise<IAd | null>;
export type CreateAd = (userId: string, body: ICreateAdBody) => Promise<IAd | null>;
export type DeleteAd = (userId: string, userRole: Roles, id: string) => Promise<void>;
export type EditAd = (userId: string, userRole: Roles, adId: string, data: IEditBody) => Promise<IAd | null>;
