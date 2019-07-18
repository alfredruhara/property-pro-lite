import { pool, ddl } from './';

class PropertyQueries {
  static async create(values){
    try {

      const def = await ddl.propertyTable();
    
      if (def.error) {
        return {
          error: {
            status: 500,
            message: def.res
          },
        };
      }
    
      const query = `INSERT INTO property (
        title,
        status,
        price,
        state,
        address,
        type,
        bathrooms,
        bedrooms,
        image_url,
        description,
        kindoftrade,
        owner)  VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`;

        const res = await pool.query(query, values);
        return res;
        
    }catch(e){
      return {
        error : {
          status: 500,
          message: 'Unable to insert data into the property  table',
          error : e.message
        }
      };
    }
  }

  static async getOne(id) {
    try {
      const def = await ddl.propertyTable();
    
      if (def.error) {
        return {
          error: {
            status: 500,
            message: def.res
          },
        };
      }
      const query = `SELECT property.*,users.firstname, users.lastname, users.email , users.phonenumber
      FROM property 
      INNER JOIN users 
      ON property.owner = users.id 
      WHERE property.id = $1 `;

      const result = await pool.query(query , id);
      return result;
  
    }catch(e){
      return {
        error : {
          status: 500,
          message: 'Unable to select data from the property  table',
          error : e.message
        }
      };
    }
  }

  static async getAll(values, which){
    try {
      const def = await ddl.propertyTable();
    
      if (def.error) {
        return {
          error: {
            status: 500,
            message: def.res
          },
        };
      }
      let result ;
      if ( which === 'trade') {
        const query = `SELECT * FROM property  WHERE status = $1 and owner = $2 `;
        result = await pool.query(query, values);

      } else {
        const query = `SELECT property.*,users.firstname, users.lastname, users.email , users.phonenumber
        FROM property 
        INNER JOIN users 
        ON property.owner = users.id 
        WHERE property.status = $1 `;

        result = await pool.query(query, values);
      }
    

      return result;
  
    }catch(e){
      return {
        error : {
          status: 500,
          message: 'Unable to select data from the property  table',
          error : e.message
        }
      };
    }
  }

  static async delete (value){
    try {

      const query = `DELETE FROM property WHERE id = $1 and owner =$2 `;
      const result = await pool.query(query , value);
      return result;
  
    }catch(e){
      return {
        error : {
          status: 500,
          message: 'Unable to delete data from the property  table',
          error : e.message
        }
      };
    }

  }

  static async update (value){
    try {
      const query = `
       UPDATE property SET 
       title = $1,
       status = $2,
       price = $3,
       state = $4,
       address = $5,
       type =  $6,
       bathrooms = $7,
       bedrooms = $8,
       image_url = $9,
       description = $10,
       kindoftrade = $11

       WHERE id = $12 and owner = $13
       RETURNING id,title,status,price,state,address,type,bathrooms,bedrooms,image_url,description,kindoftrade
      `
      const result = await pool.query(query, value);
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
  
  static async sold(value){
    try {
      const query = `
       UPDATE property SET 
       status = $1
       WHERE id = $2 and owner = $3
       RETURNING id,title,status,price,state,address,type,bathrooms,bedrooms,image_url,description,kindoftrade
      `
      const result = await pool.query(query, value);
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

  static async filter(values, by){
    
    try {
      let query = `SELECT property.*,users.firstname, users.lastname, users.email , users.phonenumber
      FROM property 
      INNER JOIN users 
      ON property.owner = users.id `;
    
      if (by === 'locationType') {
        query += ` WHERE state = $1 and type = $2 and property.status = $3 ORDER BY property.id DESC  LIMIT 10`;
      } else {
        query += ` WHERE  state = $1  and property.status = $2  ORDER BY property.id DESC LIMIT 10`;
      }

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


}

export default PropertyQueries;