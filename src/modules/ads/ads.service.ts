import createHttpError from 'http-errors';
import { Types } from 'mongoose';
import { AdModel } from '@/modules/ads/ads.model';
import { GetAdsList, GetAd, CreateAd, DeleteAd, EditAd } from '@/modules/ads/ads.types';
import { Roles } from '@/types/user.types';

export const getAds: GetAdsList = async ({ categories = [], query = '', page = 1, limit = 10 }) => {
    const filter: Record<string, any> = {};

    if (categories?.length > 0) {
        filter.category = { $in: categories };
    }

    if (query) {
        filter.title = {
            $regex: query,
            $options: 'i',
        };
    }

    const [ads, totalCount] = await Promise.all([
        AdModel.find(filter)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('createdBy', 'username'),
        AdModel.countDocuments(filter),
    ]);

    return {
        ads,
        totalCount,
    };
};

export const getAd: GetAd = async (id) => {
    if (!id || !Types.ObjectId.isValid(id)) {
        throw createHttpError.BadRequest('Не верный id объявления!');
    }
    const ad = await AdModel.findById(id).populate('createdBy', 'username');

    if (!ad) {
        throw createHttpError.NotFound('Объявление не найдено!');
    }

    return ad;
};

export const createAd: CreateAd = async (userId, body) => {
    if (!userId) {
        throw createHttpError.Unauthorized('Нужна авторизация!');
    }
    const { title, description, category } = body;
    if (!title || !description || !category) {
        throw createHttpError.BadRequest('Не верный запрос!');
    }

    const ad = new AdModel({
        title,
        description,
        category,
        createdBy: userId,
    });
    await ad.save();

    return ad;
};

export const deleteAd: DeleteAd = async (userId, userRole, id) => {
    if (!userId) {
        throw createHttpError.Unauthorized('Нужна авторизация!');
    }
    if (!id) {
        throw createHttpError.BadRequest('Не верный запрос!');
    }

    const ad = await AdModel.findById(id).populate<{ createdBy: { id: string } }>('createdBy', 'id');
    if (!ad) {
        throw createHttpError.NotFound('Объявление не найденно!');
    }

    if (ad.createdBy?.id !== userId && ![Roles.Admin, Roles.Moderator].includes(userRole)) {
        throw createHttpError.Forbidden('Недостаточно прав для редактирования');
    }

    await AdModel.findByIdAndDelete(id);

    return;
};

export const editAd: EditAd = async (userId, userRole, adId, data) => {
    const ad = await AdModel.findById(adId).populate<{ createdBy: { id: string } }>('createdBy', 'id');
    if (!ad) {
        throw createHttpError.Forbidden('Объявление не найденно!');
    }
    if (ad.createdBy?.id !== userId && ![Roles.Admin, Roles.Moderator].includes(userRole)) {
        throw createHttpError.Forbidden('Недостаточно прав для редактирования');
    }

    const updatedAd = await AdModel.findByIdAndUpdate(adId, { $set: data }, { new: true }).populate(
        'createdBy',
        'username',
    );

    if (!updatedAd) {
        throw createHttpError.NotFound('Пользователь не найден после обновления');
    }

    return updatedAd;
};
