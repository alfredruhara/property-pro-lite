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
            status: 409,
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

  static async findUser(id) {
    try {
      const query = `SELECT * FROM users WHERE id = $1 `
      const result = await pool.query(query, id);
      return result;
    }catch(e){
      return {
        error : {
          status: 500,
          message: 'Unable to select data to the users  table',
          error : e.message
        }
      };
    }
  }
  static async changePassword(values) {
    try {
      const query = `UPDATE users SET password = $1 WHERE id = $2 `
      const result = await pool.query(query, values);
      return result;
  
    }catch(e){
      return {
        error : {
          status: 500,
          message: 'Unable to update data to the users  table',
          error : e.message
        }
      };
    }
  }

  static async updateInformations (values){
    try {
      const query = `
       UPDATE users SET 
       firstname = $1,
       lastname = $2,
       phonenumber = $3,
       address = $4
       WHERE id = $5 
       RETURNING id,firstname,lastname,email,phonenumber,address
      `
      const result = await pool.query(query, values);
      return result;
  
    }catch(e){
      return {
        error : {
          status: 500,
          message: 'Unable to update data from the property  table',
          error : e.message
        }
      };
    }

  }
  static async updateAvatar(values){
    try {
      const query = `UPDATE users SET avatar = $1 WHERE id = $2 
       RETURNING id,firstname,lastname,email,phonenumber,address,avatar
      `
      const result = await pool.query(query, values);
     
      return result;
  
    }catch(e){
      return {
        error : {
          status: 500,
          message: 'Unable to update data from the property  table',
          error : e.message
        }
      };
    }

  }

  static async getEmail(email){
    try{
      const query = `SELECT email FROM users WHERE email = $1`;
      const result= await pool.query(query, email);
      return result ;
    }catch (e) {
      return {
        error : {
          status: 500,
          message: 'Unable to select data from the users  table',
          error : e.message
        }
      };
    }

  }


}

export default userQueries