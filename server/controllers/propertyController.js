import URL from 'url';
import { propertyDB, PropertyModel } from '../models/propertyModel';
import {
  SUCCESS_CODE,
  CREATED_CODE,
  BAD_REQUEST_CODE,
  FORBIDDEN_CODE,
  ERROR_CODE
} from '../constantes/statusCodes';
import {
  SUCCESS_MSG,
  FAIL_MSG,
  FORBIDDEN_MSG
} from '../constantes/statusMessages';

class PropertyController {
  static create(req, res) {
    const property = new PropertyModel({
      id: propertyDB.length + 1,
      owner: req.user.id,
      ownerInfo: req.user.firstName + req.user.lastName,
      title: req.body.title,
      status: req.body.status,
      price: req.body.price,
      state: req.body.state,
      city: req.body.city,
      address: req.body.address,
      type: req.body.type,
      bathRooms: req.body.bathRooms,
      bedRooms: req.body.bedRooms,
      createdOn: new Date(),
      imageUrl: req.body.imageUrl,
      ownerEmail: req.user.email,
      ownerPhoneNumber: req.user.phoneNumber,
      description: req.body.description,
      kindOfTrade: req.body.kindOfTrade
    });

    propertyDB.push(property);

    return res.status(CREATED_CODE).json({
      status: CREATED_CODE,
      message: 'Property posted',
      data: propertyDB
    });
  }

  static all(req, res) {
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
      if (property.status) {
        const newPropertyModel = {
          id: property.id,
          title: property.title,
          state: property.state,
          city: property.city,
          price: property.price,
          type: property.type,
          address: property.address,
          bathRooms: property.bathRooms,
          bedRooms: property.bathRooms,
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
      return res.status(ERROR_CODE).json({
        status: ERROR_CODE,
        message: 'All have been trade . try late'
      });
    }
    return res.status(SUCCESS_CODE).json({
      status: SUCCESS_CODE,
      message: 'List of properties',
      data: properties
    });
  }

  static view(req, res) {
    // eslint-disable-next-line radix
    const propertyId = parseInt(req.params.id);
    const property = propertyDB.find(item => item.id === propertyId);

    if (property) {
      if (property.status) {
        return res.status(SUCCESS_CODE).json({
          status: SUCCESS_CODE,
          message: 'Single property',
          data: property
        });
      }
      return res.status(FORBIDDEN_CODE).json({
        status: FORBIDDEN_CODE,
        message: 'The ressource you are trying to view have been removed'
      });
    }
    return res.status(BAD_REQUEST_CODE).json({
      status: BAD_REQUEST_CODE,
      message: 'This resource does not exist'
    });
  }

  static delete(req, res) {
    // eslint-disable-next-line radix
    const propertyId = parseInt(req.params.id);
    const property = propertyDB.find(item => item.id === propertyId);
    if (property) {
      if (property.owner === req.user.id) {
        const index = propertyDB.indexOf(property);
        propertyDB.splice(index, 1);
        return res.status(SUCCESS_CODE).json({
          status: SUCCESS_CODE,
          message: 'advdert property deleted'
        });
      }
      return res.status(BAD_REQUEST_CODE).json({
        status: BAD_REQUEST_CODE,
        message: 'Only the own of this ressource can perfom this action'
      });
    }

    return res.status(BAD_REQUEST_CODE).json({
      status: BAD_REQUEST_CODE,
      message: 'This resource does not exist'
    });
  }

  static update(req, res) {
    // eslint-disable-next-line radix
    const propertyId = parseInt(req.params.id);
    const onPropertyUpdate = propertyDB.find(item => item.id === propertyId);
    if (onPropertyUpdate) {
      if (onPropertyUpdate.owner === req.user.id) {
        const {
          title,
          status,
          price,
          state,
          city,
          address,
          type,
          bathRooms,
          bedRooms,
          imageUrl,
          description,
          kindOfTrade
        } = req.body;

        (onPropertyUpdate.title = title);
        (onPropertyUpdate.status = status);
        (onPropertyUpdate.price = price);
        (onPropertyUpdate.state = state);
        (onPropertyUpdate.city = city);
        (onPropertyUpdate.address = address);
        (onPropertyUpdate.type = type);
        (onPropertyUpdate.bathRooms = bathRooms);
        (onPropertyUpdate.bedRooms = bedRooms);
        (onPropertyUpdate.imageUrl = imageUrl);
        (onPropertyUpdate.description = description);
        (onPropertyUpdate.kindOfTrade = kindOfTrade);

        return res.status(SUCCESS_CODE).json({
          status: SUCCESS_CODE,
          message: 'Post edited',
          data: onPropertyUpdate
        });
      }
      return res.status(BAD_REQUEST_CODE).json({
        status: BAD_REQUEST_CODE,
        message: 'Only the own of this ressource can perfom this action'
      });
    }
    return res.status(BAD_REQUEST_CODE).json({
      status: BAD_REQUEST_CODE,
      message: 'This resource does not exist'
    });
  }

  static trade(req, res) {
    // eslint-disable-next-line radix
    const propertyId = parseInt(req.params.id);
    const onPropertyTrade = propertyDB.find(item => item.id === propertyId);
    if (onPropertyTrade) {
      if (onPropertyTrade.owner === req.user.id) {
        (onPropertyTrade.status = false);

        return res.status(SUCCESS_CODE).json({
          status: SUCCESS_CODE,
          message: 'Property mark as trade or sold/ or ented',
          data: onPropertyTrade
        });
      }
      return res.status(BAD_REQUEST_CODE).json({
        status: BAD_REQUEST_CODE,
        message: 'Only the own of this ressource can perfom this action'
      });
    }
    return res.status(BAD_REQUEST_CODE).json({
      status: BAD_REQUEST_CODE,
      message: 'This resource does not exist'
    });
  }

  static untrade(req, res) {
    // eslint-disable-next-line radix
    const propertyId = parseInt(req.params.id);
    const onPropertyUnTrade = propertyDB.find(item => item.id === propertyId);
    if (onPropertyUnTrade) {
      if (onPropertyUnTrade.owner === req.user.id) {
        (onPropertyUnTrade.status = true);

        return res.status(SUCCESS_CODE).json({
          status: SUCCESS_CODE,
          message: 'Property bring back to market',
          data: onPropertyUnTrade
        });
      }
      return res.status(BAD_REQUEST_CODE).json({
        status: BAD_REQUEST_CODE,
        message: 'Only the own of this ressource can perfom this action'
      });
    }
    return res.status(BAD_REQUEST_CODE).json({
      status: BAD_REQUEST_CODE,
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
      if (property.status === true && property.owner === req.user.id) {
        const newPropertyModel = {
          id: property.id,
          title: property.title,
          state: property.state,
          city: property.city,
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
      if (property.status === false && property.owner === req.user.id) {
        const newPropertyModel = {
          id: property.id,
          title: property.title,
          state: property.state,
          city: property.city,
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
      properties = propertyDB.filter(property => property.state === location && property.status === true);

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
