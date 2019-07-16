import { pool, ddl } from './';

class userQueries {
  /**
  * Model to sign up a user
  *
  * @static
  * @param [] values
  * @returns
  * @memberof userQueries
  */
  static async create(values) {
     console.log(values);
    try {

     const def = await ddl.usersTable();
      if (def.error) {
        return {
          error: {
            status: 500,
            message: def.res
          },
        };
      }

      const exist = await pool.query('SELECT * FROM users WHERE email = $1', [values[2]]);
      // console.log(exist);
      if (exist.rowCount > 0) {
        return {
          error : {
            status: 403,
            message: 'The email adress already exist',
          }
       
        };
      }

     const result = await pool.query(`INSERT INTO users (
          firstname,
          lastname,
          email,
          phonenumber,
          password
          ) VALUES($1, $2, $3, $4, $5) RETURNING id, email`, values);

      console.log(result.error);

      return result;

      }catch(e){
         console.log(e.message);
        return {
          error : {
            status: 500,
            message: 'Unable to insert data into the users table',
            err : e.message
          }
        };
    }

  }


}

export default userQueries