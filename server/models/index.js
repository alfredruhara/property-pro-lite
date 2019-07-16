import { Pool } from 'pg';
import dbConfig from '../config';

const query = process.env.STRING_CONN;

const pool = new Pool( dbConfig );

// console.log(pool);

const ddl = {
  usersTable : async () => {
   // const query2 = `CREATE DATABASE IF NOT EXISTS alfredchada`;
    const query = `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      firstname character varying(50) NOT NULL,
      lastname character varying(50) NOT NULL,
      email character varying(100) NOT NULL UNIQUE,
      phonenumber character varying(20) NOT NULL,
      password character varying(120) NOT NULL,
      isadmin boolean DEFAULT true,
      address character varying(50),
      avatar character varying(150)
    );`
    
    try {
      const res = await pool.query(query);
      return res
    }catch(e){
      console.log(e);
      return {
        error: true,
        res: 'Unable to create the users table',
      };
    }

  }
  
  
}

export {pool, ddl};
