import { z } from 'zod';

export const registartionSchema = z.object({
    login: z
        .string()
        .min(3, 'Логин должен содержать минимум 3 символа')
        .max(50, 'Логин не должен превышать 50 символов'),
    password: z.string().min(4, 'Пароль должен содержать минимум 4 символа'),
    username: z
        .string()
        .min(3, 'Имя должно содержать минимум 3 символа')
        .max(50, 'Имя не должно превышать 50 символов'),
});
