import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE } from '../constantes/statusCodes';
import { BAD_REQUEST_MSG } from '../constantes/statusMessages';
/* Handles controller errors
*
* @class Errors
*/
class Errors {
  /**
   *
   *
   * @static
   * @param {*} res
   * @param {*} e
   * @returns {object} error
   * @memberof errors
   */
  // static errorResponse(res, e) {
  //   return res.status(500).json({
  //     status: INTERNAL_SERVER_ERROR_CODE,
  //     error: e.message
  //   });
  // }

  /**
*
*
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
