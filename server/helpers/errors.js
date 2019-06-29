import { BAD_REQUEST_CODE } from '../constantes/statusCodes';
import { BAD_REQUEST_MSG } from '../constantes/statusMessages';

class Errors {
  static joiErrorResponse(res, e) {
    return res.status(BAD_REQUEST_CODE).json({
      status: BAD_REQUEST_MSG,
      message: e.details[0].message.replace(/[^a-zA-Z0-9 ]/g, '')
    });
  }
}

export default Errors;
