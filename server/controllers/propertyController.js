import { propertyDB, PropertyModel } from '../models/propertyModel';
import { tmpSession } from '../models/userModel';
import {
  SUCCESS_CODE,
  CREATED_CODE,
  BAD_REQUEST_CODE,
  UNAUTHORIZED_CODE,
  FORBIDDEN_CODE
} from '../constantes/statusCodes';
import { SUCCESS_MSG, FAIL_MSG, FORBIDDEN_MSG } from '../constantes/statusMessages';
import { UNAUTHENTIFICATED_MSG } from '../constantes/customeMessages';

class PropertyController {
  static create(req, res) {
    if (tmpSession.length < 1) {
      return res.status(UNAUTHORIZED_CODE).json({
        status: UNAUTHORIZED_CODE,
        message: UNAUTHENTIFICATED_MSG
      });
    }
    const {
      id,
      names,
      email,
      phoneNumber
    } = tmpSession[0];
    const property = new PropertyModel({
      id: propertyDB.length + 1,
      owner: id,
      ownerInfo: names,
      status: req.body.status,
      price: req.body.price,
      state: req.body.state,
      city: req.body.city,
      address: req.body.address,
      type: req.body.type,
      createdOn: new Date(),
      imageUrl: req.body.imageUrl,
      ownerEmail: email,
      ownerPhoneNumber: phoneNumber
    });

    propertyDB.push(property);

    return res.status(CREATED_CODE).json({
      status: SUCCESS_MSG,
      data: propertyDB
    });
  }

  static all(req, res) {

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
      message: 'Resource does not exist'
    });
  }
}
export default PropertyController;
