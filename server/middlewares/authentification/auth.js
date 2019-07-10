import jwt from "jsonwebtoken";
import { BAD_REQUEST_CODE, SUCCESS_CODE , FORBIDDEN_CODE } from "../../constantes/statusCodes";
import { SUCCESS_MSG , FAIL_MSG} from "../../constantes/statusMessages";
import { MISS_TOKEN_MSG, AUTHENTIFICATED_MSG , TOKEN_FORBIDDEN_MSG} from "../../constantes/customeMessages";
import dotenv from "dotenv";
dotenv.config();

/**
 * Validates the user
 * authentification
 *
 * @class Auth
 */
class Auth {
  
  /**
   * Checks if the token
   * contains an authorized user
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   * @memberof Auth
   */
  static async verifyToken(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(BAD_REQUEST_CODE).json({
        status: BAD_REQUEST_CODE,
        message: MISS_TOKEN_MSG
      });
    }

    const token = authorization.split(" ")[1];
  
    if ( token ) {
      console.log(token);
       jwt.verify(token, process.env.SECRET, (err, authUser) => {
       // console.log(req.authUser);
      // console.log(err);
        if (err) {
          return res.status(401).json({
            status: 'Token Failed',
            message: TOKEN_FORBIDDEN_MSG ,
          });
        }
        req.user = authUser ;
        next();
      });
      
    } else {
      return res.status(FORBIDDEN_CODE).json({
        status: FORBIDDEN_CODE,
        success: FAIL_MSG ,
        message: TOKEN_FORBIDDEN_MSG
      });
    }

  }
}
export default Auth;
