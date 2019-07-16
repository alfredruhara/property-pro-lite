import dotenv from 'dotenv';

dotenv.config();

const DB_URL = process.env.NODE_ENV === 'test' ? process.env.DB_TEST_CON : process.env.DB_DEV_CON;

export default DB_URL;
