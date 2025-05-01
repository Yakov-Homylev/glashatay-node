import { z } from 'zod';
import { Category } from '@/modules/ads/ads.types';

const MAX_TEXTAREA_SYMBOLS = 1000;

export const createSchema = z.object({
    title: z.string().min(3, 'Заголовок должен содержать минимум 3 символов'),
    description: z
        .string()
        .min(10, 'Описание должно содержать минимум 10 символов')
        .max(MAX_TEXTAREA_SYMBOLS, `Описание должно быть не более ${MAX_TEXTAREA_SYMBOLS} символов`),
    category: z.enum([Category.Common, Category.Search, Category.Trade, Category.General], {
        required_error: 'Категория обязательна',
        invalid_type_error: 'Недопустимая категория',
    }),
});

export const updateSchema = z.object({
    title: z.string().min(3, 'Заголовок должен содержать минимум 3 символов'),
    description: z
        .string()
        .min(10, 'Описание должно содержать минимум 10 символов')
        .max(MAX_TEXTAREA_SYMBOLS, `Описание должно быть не более ${MAX_TEXTAREA_SYMBOLS} символов`),
});
