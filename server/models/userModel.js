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
        return {
          error : {
            status: 500,
            message: 'Unable to insert data into the users table',
            err : e.message
          }
        };
    }

  }
  
  /**
  * Model to sign in a user
  *
  * @static
  * @param [] values
  * @returns
  * @memberof userQueries
  */
  static async signin(values) {
    try {
      const def = await ddl.usersTable();
      if (def.error) {
        return {
          error: {
            status: 500,
            message: def.res
          }
        };
      }

      const res = await pool.query('SELECT id,firstname,lastname,email,password,phonenumber FROM users WHERE email= $1 ', values);
      return res;
    } catch (e) {
      return {
        error: {
          status: 500,
          message: 'Unable to select data from the users table'
        }
      };
    }
  
  }
  static async  agents() {
    try {
       const res = await pool.query('SELECT fristname,lastname,email,phonenumber FROM users RETURNING *');
      return res;
    }catch(e){
      return {
        error: {
          status: 500,
          message: 'Unable to select all data from the users table'
        }
      };
   }  

  }


}

export default userQueries