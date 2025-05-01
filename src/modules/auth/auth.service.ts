import jwt from 'jsonwebtoken';
import { UserModel } from '@/models/user.model';
import { IUser, Roles } from '@/types/user.types';
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '@/config/env';
import createHttpError from 'http-errors';

export const registration = async (login: string, password: string, username: string) => {
    const user = await UserModel.findOne({ login });

    if (user) {
        throw createHttpError.NotFound('Пользователь уже существует!');
    }

    const newUser = new UserModel({
        login,
        username,
        role: Roles.User,
    });

    await newUser.setPassword(password);

    return generateTokens(newUser);
};

export const login = async (login: string, password: string) => {
    const user = await UserModel.findOne({ login });

    if (!user || !(await user.checkPassword(password))) {
        throw createHttpError.Forbidden('Данные не верны!');
    }

    return generateTokens(user);
};

export const refresh = async (refreshToken: string) => {
    const user = await UserModel.findOne({ refreshToken });
    if (!user) {
        throw createHttpError.Forbidden('Срок действия пропуска истек!');
    }

    try {
        jwt.verify(refreshToken, JWT_REFRESH_SECRET);
        return generateTokens(user);
    } catch (error) {
        await UserModel.updateOne(
            {
                _id: user.id,
            },
            {
                $unset: {
                    refreshToken: 1,
                },
            },
        );
        throw createHttpError.Forbidden('Токен обновления истек!');
    }
};

export const logout = async (userId: string) => {
    await UserModel.findByIdAndUpdate(userId, { $unset: { refreshToken: 1 } });
};

export const generateTokens = async (user: IUser) => {
    const accessToken = jwt.sign(
        {
            userId: user.id,
            role: user.role,
        },
        JWT_ACCESS_SECRET,
        { expiresIn: '4h' },
    );

    const refreshToken = jwt.sign(
        {
            userId: user.id,
        },
        JWT_REFRESH_SECRET,
        { expiresIn: '7d' },
    );

    user.refreshToken = refreshToken;
    user.save();

    return { accessToken, refreshToken };
};
