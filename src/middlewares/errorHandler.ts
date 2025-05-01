import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof createHttpError.HttpError) {
        res.status(err.status).json({
            result: {
                message: err.message,
            },
        });
        return;
    }
    console.error(err);
    res.status(500).json({ result: { message: 'Что-то пошло не так!' } });
};
