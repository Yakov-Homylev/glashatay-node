import { IUser } from '@/types/IUser';

declare global {
    namespace Express {
        export interface Request {
            user?: IUser | { userId: string; role: string };
        }
        export interface Response {
            user?: IUser | { userId: string; role: string };
        }
    }
}
