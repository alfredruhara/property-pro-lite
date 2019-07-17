import { Pool } from 'pg';
import dbConfig from '../config';

const pool = new Pool({connectionString:dbConfig});

const ddl_test = {
  dropUserTable : async() => {
     const query = `DROP TABLE IF EXISTS users`;
     try {
        const  res = await pool.query(query);
        return res ;
     }catch(e){
        return {
          error : true,
          res : 'Unable to drop the table users for tests'
        }
     }
  }
}


const ddl = {
  usersTable : async () => {
    const query = `CREATE TABLE IF NOT EXISTS users (
      id integer PRIMARY KEY,
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
     // console.log(res);
      return res;
     
    }catch(e){
      //console.log(e);
      return {
        error: true,
        res: 'Unable to create the users table',
      };
    }

  },
  propertyTable : async () => {
    const query = `CREATE TABLE IF NOT EXISTS property (
      id SERIAL PRIMARY KEY,
      title character varying,
      status character varying,
      price double precision,
      state character varying,
      address character varying,
      type character varying,
      bathrooms character varying,
      bedrooms character varying,
      image_url character varying,
      description character varying,
      kindoftrade character varying,
      created_on timestamp without time zone DEFAULT NOW(),
      owner integer REFERENCES users(id) ON DELETE CASCADE
    );`

    try{
      const res = await pool.query(query);
      return res;
    }catch(e){
      return {
        error: true,
        res: 'Unable to create the property table'
      }
    }

  }
  
  
}

export {pool, ddl, ddl_test};
