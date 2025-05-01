import { UserModel } from '@/models/user.model';
import { Roles } from '@/types/user.types';
import createHttpError from 'http-errors';

export const getUser = async (userId: string) => {
    const user = await UserModel.findById(userId).select('-password -refreshToken');
    if (!user) {
        throw createHttpError.NotFound('Пользователь не найден');
    }
    return user;
};

export const updateUser = async (userId: string, userForUpdateId: string, role: Roles, data: any) => {
    const currentUser = await UserModel.findById(userForUpdateId).select('-password -refreshToken');
    if (!currentUser || userId !== userForUpdateId || ![Roles.Admin].includes(role)) {
        throw createHttpError.Forbidden('Только администратор может редактировать других пользователей');
    }
    const { username, about } = data;
    const updatedUser = await UserModel.findByIdAndUpdate(
        userForUpdateId,
        { $set: { username, about } },
        { new: true },
    ).select('-password -refreshToken');

    if (!updatedUser) {
        throw createHttpError.NotFound('Пользователь не найден после обновления');
    }

    return updatedUser;
};
