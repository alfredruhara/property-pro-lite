import URL from 'url';
import  PropertyQueries  from '../models/propertyModel';
import userQueries from "../models/userModel";
import { userDB } from '../models/userModel';
import {
  SUCCESS_CODE,
  CREATED_CODE,
  FORBIDDEN_CODE,
  ERROR_CODE
} from '../constantes/statusCodes';

class PropertyController {
  static async create(req, res) {
  
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
      req.user.id
    ];


    const result = await PropertyQueries.create(values);
    console.log(result);
 
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

    const result = await PropertyQueries.delete([propertyId, req.user.id]);

    if (result.rowCount !== 0) {
      return res.status(SUCCESS_CODE).json({
        status: SUCCESS_CODE,
        message: 'advdert property deleted'
      });
    }

    return res.status(404).json({
      status: 404,
      error: 'Property not found',
    });

  }

  static async update(req, res) {
    // eslint-disable-next-line radix
    const propertyId = parseInt(req.params.id);
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
        message: 'Post edited',
        data: result.rows[0]
      });
    }

    return res.status(ERROR_CODE).json({
      status: ERROR_CODE,
      message: 'This resource does not exist'
    });

  }

  static  async trade(req, res) {
    const propertyId = parseInt(req.params.id);
    const values = [
     "sold",
      propertyId,
      req.user.id
    ];

    const result = await PropertyQueries.sold(values);
    
    console.log(result);

    if (result.rowCount > 0) {
      return res.status(SUCCESS_CODE).json({
        status: SUCCESS_CODE,
        message: 'Property mark as sold',
        data: result.rows[0]
      });
    }

    return res.status(ERROR_CODE).json({
      status: ERROR_CODE,
      message: 'This resource does not exist'
    });

  }

  static async untrade(req, res) {
    const propertyId = parseInt(req.params.id);
    const values = [
     "unsold",
      propertyId,
      req.user.id
    ];

    const result = await PropertyQueries.sold(values);
    
    console.log(result);

    if (result.rowCount > 0) {
      return res.status(SUCCESS_CODE).json({
        status: SUCCESS_CODE,
        message: 'Property mark as unsold',
        data: result.rows[0]
      });
    }

    return res.status(ERROR_CODE).json({
      status: ERROR_CODE,
      message: 'This resource does not exist'
    });
  }

  static agentProperty(req, res) {
    const propertyDbLength = propertyDB.length;

    if (propertyDbLength < 1) {
      return res.status(ERROR_CODE).json({
        status: ERROR_CODE,
        message: 'Adverts properties datas unavailable'
      });
    }

    const properties = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const property of propertyDB) {
      if (property.status === 'unsold' && property.owner === req.user.id) {
        const newPropertyModel = {
          id: property.id,
          title: property.title,
          state: property.state,
          price: property.price,
          type: property.type,
          bathRooms: property.bathRooms,
          bedRooms: property.bedRooms,
          address: property.address,
          imageUrl: property.imageUrl,
          createdOn: property.createdOn,
          ownerInfo: `By ${property.ownerInfo}`,
          description: property.description,
          kindOfTrade: property.kindOfTrade
        };
        properties.push(newPropertyModel);
      }
    }
    if (properties.length < 1) {
      return res.status(SUCCESS_CODE).json({
        status: SUCCESS_CODE,
        message: 'Nothing to show'
      });
    }
    return res.status(SUCCESS_CODE).json({
      status: SUCCESS_CODE,
      data: properties
    });
  }

  static agentPropertyTrade(req, res) {
    const propertyDbLength = propertyDB.length;

    if (propertyDbLength < 1) {
      return res.status(ERROR_CODE).json({
        status: ERROR_CODE,
        message: 'Adverts properties datas unavailable'
      });
    }

    const properties = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const property of propertyDB) {
      if (property.status === 'sold' && property.owner === req.user.id) {
        const newPropertyModel = {
          id: property.id,
          title: property.title,
          state: property.state,
          price: property.price,
          type: property.type,
          bathRooms: property.bathRooms,
          bedRooms: property.bedRooms,
          address: property.address,
          imageUrl: property.imageUrl,
          createdOn: property.createdOn,
          ownerInfo: `By ${property.ownerInfo}`,
          description: property.description,
          kindOfTrade: property.kindOfTrade
        };
        properties.push(newPropertyModel);
      }
    }
    if (properties.length < 1) {
      return res.status(SUCCESS_CODE).json({
        status: SUCCESS_CODE,
        message: 'Nothing to show'
      });
    }
    return res.status(SUCCESS_CODE).json({
      status: SUCCESS_CODE,
      data: properties
    });
  }

  static filter(req, res) {
    const propertyDbLength = propertyDB.length;

    if (propertyDbLength < 1) {
      return res.status(ERROR_CODE).json({
        status: ERROR_CODE,
        message: 'Adverts properties datas unavailable'
      });
    }

    const filterURL = URL.parse(req.url, true).query;
    const location = filterURL.location === undefined ? undefined : filterURL.location;

    if (location) {
      let properties = [];
      const type = filterURL.type === undefined ? undefined : filterURL.type;
      const bathRooms = filterURL.bathrooms === undefined ? undefined : filterURL.bathrooms;
      const bedrooms = filterURL.bedrooms === undefined ? undefined : filterURL.bedrooms;

      // eslint-disable-next-line max-len
      properties = propertyDB.filter(property => property.state === location && property.status === 'unsold');

      if (type) {
        properties = properties.filter(prop => prop.type === type);
      }

      if (type && bathRooms && bedrooms) {
        // eslint-disable-next-line max-len
        properties = properties.filter(prop => prop.bathRooms === bathRooms || prop.bedRooms === bedrooms);
      }

      if (properties.length < 1) {
        return res.status(ERROR_CODE).json({
          status: ERROR_CODE,
          message: 'Nothing to show'
        });
      }
      return res.status(SUCCESS_CODE).json({
        status: SUCCESS_CODE,
        data: properties
      });
    }
    return res.status(ERROR_CODE).json({
      status: ERROR_CODE,
      data: 'Provide a location '
    });
  }
}

export default PropertyController;
