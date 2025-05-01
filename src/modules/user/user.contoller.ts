import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import * as userService from '@/modules/user/user.service';

export const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req?.user;
        const user = await userService.getUser(userId);
        res.json({
            result: {
                user,
            },
        });
    } catch (error) {
        if (error instanceof createHttpError.HttpError) {
            res.status(error.status).json({ result: { message: error.message } });
            return;
        }
        console.error(error);
        res.status(500).json({ result: { message: 'Что-то пошло не так!' } });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { role, userId } = req?.user;
        const { id } = req.params;
        const { body } = req;
        const user = await userService.updateUser(userId, id, role, body);
        res.json({
            result: {
                user,
            },
        });
    } catch (error) {
        if (error instanceof createHttpError.HttpError) {
            res.status(error.status).json({ result: { message: error.message } });
            return;
        }
        console.error(error);
        res.status(500).json({ result: { message: 'Что-то пошло не так!' } });
    }
};

export const getUserInfo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await userService.getUser(id);

        res.json({
            result: {
                user,
            },
        });
    } catch (error) {
        if (error instanceof createHttpError.HttpError) {
            res.status(error.status).json({ result: { message: error.message } });
            return;
        }
        console.error(error);
        res.status(500).json({ result: { message: 'Что-то пошло не так!' } });
    }
};
