import 'tsconfig-paths/register';
import app from '@/app';
import { connectDB } from '@/config/db';
import { PORT } from '@/config/env';

const start = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Сервер запущен на порту ${PORT}`);
    });
};

start();
