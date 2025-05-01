import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_ACCESS_SECRET } from '@/config/env';
import createHttpError from 'http-errors';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw createHttpError.Unauthorized('Требуется аутентификация');
        }

        const [bearer = '', token = ''] = authHeader?.split(' ');
        if (!bearer || !token) {
            throw createHttpError.Unauthorized('Неверный формат токена');
        }

        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, JWT_ACCESS_SECRET, (error, decoded) => {
                if (error) {
                    reject(createHttpError.Unauthorized('Неверный токен'));
                } else {
                    resolve(decoded);
                }
            });
        });

        req.user = decoded;
        next();
    } catch (error) {
        if (error instanceof createHttpError.HttpError) {
            res.status(error.status).json({
                result: {
                    message: error.message,
                },
            });
            return;
        }

        console.error(error);
        res.status(500).json({
            result: {
                message: 'Что-то пошло не так!',
            },
        });
    }
};
