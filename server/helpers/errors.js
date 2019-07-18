import { BAD_REQUEST_CODE } from '../constantes/statusCodes';
/* Handles controller errors
*
* @class Errors
*/
class Errors {
/*
* @static
* @param {*} res
* @param {*} e
* @returns {object} error
* @memberof Errors
*/
  static joiErrorResponse(res, e) {
    return res.status(BAD_REQUEST_CODE).json({
      status: BAD_REQUEST_CODE,
      error: e.details[0].message.replace(/[^a-zA-Z0-9 ]/g, '')
    });
  }
}

export default Errors;
