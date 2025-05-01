import { z } from 'zod';

export const updateSchema = z.object({
    username: z
        .string()
        .min(3, 'Имя должно содержать минимум 3 символа')
        .max(50, 'Имя должно содержать максимум 50 символа'),
});
