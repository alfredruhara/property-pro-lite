import { propertyDB, PropertyModel } from '../models/propertyModel';
import { tmpSession } from '../models/userModel';
import { CREATED_CODE, UNAUTHORIZED_CODE } from '../constantes/statusCodes';
import { SUCCESS_MSG } from '../constantes/statusMessages';
import { UNAUTHENTIFICATED_MSG } from '../constantes/customeMessages';

class PropertyController {
  static create(req, res) {
    if (tmpSession.length < 1) {
      return res.status(UNAUTHORIZED_CODE).json({
        status: UNAUTHORIZED_CODE,
        message: UNAUTHENTIFICATED_MSG
      });
    }
    const { id, names } = tmpSession[0];
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
      imageUrl: req.body.imageUrl
    });

    propertyDB.push(property);

    return res.status(CREATED_CODE).json({
      status: SUCCESS_MSG,
      data: propertyDB
    });
  }
}
export default PropertyController;
