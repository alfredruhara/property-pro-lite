import pool from '../config/config';

class userQueries {

  static async create(values) {
      try {
        const result = await pool.query(`INSERT INTO users (
          firstname,
          lastname,
          email,
          password,
          phoneNumber,
          ) VALUES($1, $2, $3, $4, $5) RETURNING id, email `, values);
          return result ;
      }catch(e){
        return {
          status: 500,
          message: 'Failed to insert data into the users table',
        };
      }
  }
}

export default userQueries