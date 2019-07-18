import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line import/no-mutable-exports
let DB_URL = '';

/** Check whatever the application has been run for dev or test pursposes  */
if (process.env.NODE_ENV === 'test') {
  DB_URL = process.env.DB_TEST_CON;
} else {
  DB_URL = process.env.DATABASE_URL;
}

export default DB_URL;
