import { config } from 'dotenv';

config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || '';
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || '';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || '';

export { PORT, MONGO_URI, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET };
