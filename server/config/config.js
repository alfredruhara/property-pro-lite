import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const dev = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
};

const DB_URL = process.env.NODE_ENV === 'test' ? process.env.DB_URL : dev;

const pool = new Pool({ DB_URL });

export default pool;
