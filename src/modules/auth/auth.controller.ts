import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import * as authService from '@/modules/auth/auth.service';

export async function registration(req: Request, res: Response) {
    try {
        const { login, password, username } = req.body;

        const tokens = await authService.registration(login, password, username);

        res.status(201).json({ result: { tokens } });
    } catch (error) {
        if (error instanceof createHttpError.HttpError) {
            res.status(error.status).json({ result: { message: error.message } });
            return;
        }
        console.error(error);
        res.status(500).json({ result: { message: 'Что-то пошло не так!' } });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { login, password } = req.body;
        const tokens = await authService.login(login, password);
        res.json({ result: { tokens } });
    } catch (error) {
        if (error instanceof createHttpError.HttpError) {
            res.status(error.status).json({ result: { message: error.message } });
            return;
        }
        console.error(error);
        res.status(500).json({ result: { message: 'Что-то пошло не так!' } });
    }
}

export async function refresh(req: Request, res: Response) {
    try {
        const { refreshToken } = req.body;
        const tokens = await authService.refresh(refreshToken);
        res.json({ result: { tokens } });
    } catch (error) {
        if (error instanceof createHttpError.HttpError) {
            res.status(error.status).json({ result: { message: error.message } });
            return;
        }
        console.error(error);
        res.status(500).json({ result: { message: 'Что-то пошло не так!' } });
    }
}

export async function logout(req: Request, res: Response) {
    try {
        if (!req.user) {
            throw createHttpError.Forbidden('Отказ в доступе!');
        }
        const { userId } = req.user;
        await authService.logout(userId);
        res.status(204).json({ result: { message: 'Выполненно успешно!' } });
    } catch (error) {
        if (error instanceof createHttpError.HttpError) {
            res.status(error.status).json({ result: { message: error.message } });
            return;
        }
        console.error(error);
        res.status(500).json({ result: { message: 'Что-то пошло не так!' } });
    }
}
