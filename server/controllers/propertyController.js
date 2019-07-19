import URL from 'url';
import cloudinary from 'cloudinary'
import  PropertyQueries  from '../models/propertyModel';
import {
  SUCCESS_CODE,
  CREATED_CODE,
  FORBIDDEN_CODE,
  ERROR_CODE
} from '../constantes/statusCodes';
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});


class PropertyController {
  static async create(req, res) {
    const values = [
      req.body.title,
      'unsold',
      parseFloat(req.body.price),
      req.body.state,
      req.body.address,
      req.body.type,
      req.body.bathRooms.toString(),
      req.body.bedRooms.toString(),
      req.body.imageUrl,
      req.body.description,
      req.body.kindOfTrade,
      req.user.id
    ];

    const result = await PropertyQueries.create(values);
 
    if (result.error) {
      return res.status(result.error.status).json({
        status: result.error.status,
        error: result.error.message
      });
    }
    result.rows[0].owner = undefined;

    return res.status(CREATED_CODE).json({
      status: CREATED_CODE,
      message: 'Property posted',
      data: result.rows[0]
    });

  }

  static async all(req, res) {

   const result = await PropertyQueries.getAll(["unsold"], 'all');

   if (result.rowCount < 1) {
     return res.status(ERROR_CODE).json({
       status: ERROR_CODE,
       message: 'Adverts properties datas unavailable'
     });
   }

   const tmp = [];
  
   // eslint-disable-next-line no-restricted-syntax
   for (const property of result.rows ) {
       const newPropertyModel = {
         id: property.id,
         title: property.title,
         status: property.status,
         state: property.state,
         price: property.price,
         type: property.type,
         address: property.address,
         bathrooms: property.bathrooms,
         bedrooms: property.bathrooms,
         image_url: property.image_url,
         created_on: property.created_on,
         description: property.description,
         kind_of_trade: property.kindOfTrade,
         ownerNames: property.firstname + property.lastname,
         ownEmail : property.email,
         ownPhoneNumber : property.phonenumber
       };
       tmp.push(newPropertyModel);
   }
 
    return res.status(SUCCESS_CODE).json({
      status: SUCCESS_CODE,
      message: 'List of properties',
      data: tmp
    });
  }

  static async view(req, res) {
    // eslint-disable-next-line radix
    const propertyId = parseInt(req.params.id);

    const result = await PropertyQueries.getOne([propertyId]);
    
    if (result.rowCount > 0) {
      if (result.rows[0].status === 'unsold') {
        
        result.rows[0].owner = undefined;

        const ownNames  = result.rows[0].firstname +  result.rows[0].lastname;
        const ownEmail =  result.rows[0].email;
        const ownPhonenumber =  result.rows[0].phonenumber;

        result.rows[0].firstname = undefined;
        result.rows[0].lastname = undefined;
        result.rows[0].email = undefined;
        result.rows[0].phonenumber = undefined;

        result.rows[0].ownNames = ownNames;
        result.rows[0].ownEmail = ownEmail;
        result.rows[0].ownPhoneNumber = ownPhonenumber;


        return res.status(SUCCESS_CODE).json({
          status: SUCCESS_CODE,
          message: 'Single property',
          data: result.rows[0]
        });
      }
      return res.status(FORBIDDEN_CODE).json({
        status: FORBIDDEN_CODE,
        message: 'The ressource you are trying to view have been removed'
      });
    }
    return res.status(ERROR_CODE).json({
      status: ERROR_CODE,
      message: 'This resource does not exist'
    });
  }

  static async delete(req, res) {
    // eslint-disable-next-line radix
    const propertyId = parseInt(req.params.id);
    const ownerId = req.user.id

    const checker = await PropertyQueries.cursor([propertyId]);
    
    if(checker.rowCount < 1 ) {
      return res.status(404).json({
        status: 404,
        error: 'Resource could not be found'
      });
    }

    if (checker.rows[0].owner === ownerId ){
      const result = await PropertyQueries.delete([propertyId,ownerId]);

      if (result.rowCount !== 0) {
        return res.status(SUCCESS_CODE).json({
          status: SUCCESS_CODE,
          message: 'advdert property deleted'
        });
      }
  
      return res.status(404).json({
        status: 404,
        error: 'Could not proceed, not found'
      });

    }

    return res.status(401).json({
      status: 401,
      error: 'Only the own of this resources can perform this action'
    });
   

  }

  static async update(req, res) {
    // eslint-disable-next-line radix
    const propertyId = parseInt(req.params.id);

    const checker = await PropertyQueries.cursor([propertyId]);
      
      if(checker.rowCount < 1 ) {
        return res.status(404).json({
          status: 404,
          error: 'Resource could not be found'
        });
      }

      if (checker.rows[0].owner === req.user.id ){

      const values = [
        req.body.title,
        req.body.status,
        parseFloat(req.body.price),
        req.body.state,
        req.body.address,
        req.body.type,
        req.body.bathRooms.toString(),
        req.body.bedRooms.toString(),
        req.body.imageUrl,
        req.body.description,
        req.body.kindOfTrade,
        propertyId,
        req.user.id
      ];

  
      const result = await PropertyQueries.update(values);
      
      if (result.rowCount > 0) {
        return res.status(SUCCESS_CODE).json({
          status: SUCCESS_CODE,
          message: 'Post edited ',
          data: result.rows[0]
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'Could not proceed, not found'
      });

    }
    return res.status(401).json({
      status: 401,
      error: 'Only the own of this resources can perform this action'
    });
    
  }

  static  async trade(req, res) {

    const propertyId = parseInt(req.params.id);
    const checker = await PropertyQueries.cursor([propertyId]);
      
    if(checker.rowCount < 1 ) {
        return res.status(404).json({
          status: 404,
          error: 'Resource could not be found'
        });
    }

    if (checker.rows[0].owner === req.user.id ){

        const values = [
        "sold",
          propertyId,
          req.user.id
        ];

        const result = await PropertyQueries.sold(values);

        if (result.rowCount > 0) {
          return res.status(SUCCESS_CODE).json({
            status: SUCCESS_CODE,
            message: 'Property mark as sold',
            data: result.rows[0]
          });
        }
        return res.status(404).json({
          status: 404,
          error: 'Could not proceed, not found',
        });
    }

    return res.status(401).json({
      status: 401,
      error: 'Only the own of this resources can perform this action'
    });

  }

  static async untrade(req, res) {
    const propertyId = parseInt(req.params.id);

    const checker = await PropertyQueries.cursor([propertyId]);
      
    if(checker.rowCount < 1 ) {
        return res.status(404).json({
          status: 404,
          error: 'Resource could not be found'
        });
    }

    if (checker.rows[0].owner === req.user.id ){
          
        const values = [
        "unsold",
          propertyId,
          req.user.id
        ];

        const result = await PropertyQueries.sold(values);
        
        if (result.rowCount > 0) {
          return res.status(SUCCESS_CODE).json({
            status: SUCCESS_CODE,
            message: 'Property mark as unsold',
            data: result.rows[0]
          });
        }

        return res.status(404).json({
          status: 404,
          error: 'Could not proceed, not found',
        });
    }

    return res.status(401).json({
      status: 401,
      error: 'Only the own of this resources can perform this action'
    });

  }

  static async agentProperty(req, res) {
   
    const result = await PropertyQueries.getAll(["unsold", req.user.id], 'trade');

    if (result.rowCount < 1) {
      return res.status(ERROR_CODE).json({
        status: ERROR_CODE,
        message: 'No properties found for this user'
      });
    }
 
     return res.status(SUCCESS_CODE).json({
       status: SUCCESS_CODE,
       message: 'List of unsold properties ',
       data: result.rows
     });
  }

  static async agentPropertyTrade(req, res) {
    const result = await PropertyQueries.getAll(["sold", req.user.id], 'trade');

    if (result.rowCount < 1) {
      return res.status(ERROR_CODE).json({
        status: ERROR_CODE,
        message: 'No sold property found for this user'
      });
    }
 
     return res.status(SUCCESS_CODE).json({
       status: SUCCESS_CODE,
       message: 'List of sold properties',
       data: result.rows
     });
  }

  static async filter(req, res) {
   
    const filterURL = URL.parse(req.url, true).query;
    const location = filterURL.location;

    if (location) {

      const type = filterURL.type ;
      let result = [];
      if (type) {
        result = await PropertyQueries.filter([location,type,'unsold'],'locationType');
      }else{
        result = await PropertyQueries.filter([location,'unsold'],'location');
      }

      if (result.error) {
        return res.status(ERROR_CODE).json({
          status: result.error.status,
          error: result.error.error
        });
      }
      if (result.rowCount < 1) {
        return res.status(ERROR_CODE).json({
          status: ERROR_CODE,
          message: 'No property found'
        });
      }

      const tmp = [];
  
      // eslint-disable-next-line no-restricted-syntax
      for (const property of result.rows ) {
          const newPropertyModel = {
            id: property.id,
            title: property.title,
            status: property.status,
            state: property.state,
            price: property.price,
            type: property.type,
            address: property.address,
            bathrooms: property.bathrooms,
            bedrooms: property.bathrooms,
            image_url: property.image_url,
            created_on: property.created_on,
            description: property.description,
            kind_of_trade: property.kindOfTrade,
            ownerNames: property.firstname + property.lastname,
            ownEmail : property.email,
            ownPhoneNumber : property.phonenumber
          };
          tmp.push(newPropertyModel);
      }
    
    
      return res.status(SUCCESS_CODE).json({
        status: SUCCESS_CODE,
        data: tmp
      });


    }

    return res.status(ERROR_CODE).json({
      status: ERROR_CODE,
      data: 'Provide a location '
    });

  }
}

export default PropertyController;
