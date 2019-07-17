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
}

export default PropertyQueries;