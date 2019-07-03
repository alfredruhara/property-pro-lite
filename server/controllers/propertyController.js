import { propertyDB, PropertyModel } from '../models/propertyModel';
import { tmpSession } from '../models/userModel';
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
    const {
      id, names, email, phoneNumber
    } = tmpSession[0];
    const property = new PropertyModel({
      id: propertyDB.length + 1,
      owner: id,
      ownerInfo: names,
      title: req.body.title,
      status: req.body.status,
      price: req.body.price,
      state: req.body.state,
      city: req.body.city,
      address: req.body.address,
      type: req.body.type,
      createdOn: new Date(),
      imageUrl: req.body.imageUrl,
      ownerEmail: email,
      ownerPhoneNumber: phoneNumber,
      description: req.body.description,
      kindOfTrade: req.body.kindOfTrade
    });

    propertyDB.push(property);

    return res.status(CREATED_CODE).json({
      status: SUCCESS_MSG,
      data: propertyDB
    });
  }

  static all(req, res) {
    const propertyDbLength = propertyDB.length;

    if (propertyDbLength < 1) {
      return res.status(ERROR_CODE).json({
        status: FAIL_MSG,
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
          imageUrl: property.imageUrl,
          createdOn: property.createdOn,
          ownerInfo: `By ${property.ownerInfo}`,
          description: property.description,
          kindOfTrade: property.kindOfTrade
        };
        properties.push(newPropertyModel);
      }

      if (properties.length < 1) {
        return res.status(ERROR_CODE).json({
          status: FAIL_MSG,
          message: 'All have been trade . try late'
        });
      }
    }

    return res.status(SUCCESS_CODE).json({
      status: SUCCESS_MSG,
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
          status: SUCCESS_MSG,
          data: property
        });
      }
      return res.status(FORBIDDEN_CODE).json({
        status: FORBIDDEN_MSG,
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
      const { id } = tmpSession[0];

      if (property.owner === id) {
        const index = propertyDB.indexOf(property);
        propertyDB.splice(index, 1);
        return res.status(SUCCESS_CODE).json({
          status: SUCCESS_MSG,
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
}
export default PropertyController;
