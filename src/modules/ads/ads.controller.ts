import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import * as adService from '@/modules/ads/ads.service';

export const getAds = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoriesArr = req.query?.categories?.toString().split(',') || [];
        const page = Number(req.query?.page || 1);
        const limit = Number(req.query?.limit || 10);
        const query = req.query?.query ? String(req.query?.query) : '';

        const { ads, totalCount } = await adService.getAds({
            categories: categoriesArr,
            page,
            limit,
            query,
        });

        res.json({
            result: {
                ads,
                totalCount,
                currentPage: page,
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

export const getAd = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const ad = await adService.getAd(id);

        res.json({
            result: { ad },
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

export const createAd = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const { body } = req;
        const ad = await adService.createAd(userId, body);

        res.json({
            result: { ad },
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

export const deleteAd = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, role } = req.user;
        const { id } = req.params;
        await adService.deleteAd(userId, role, id);

        res.json({
            result: { message: 'Успешно удаленно!' },
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

export const editAd = async (req: Request, res: Response) => {
    try {
        const { role, userId } = req?.user;
        const { id } = req.params;
        const { body } = req;
        const user = await adService.editAd(userId, role, id, body);
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
