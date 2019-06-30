import jwt from "jsonwebtoken";
import UserController from "../../controllers/userController";
import { userModel, userDB } from "../,,/models/userModel";
import { BAD_REQUEST_CODE, SUCCESS_CODE } from "../../constantes/statusCodes";
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

    if ({ token }) {
      jwt.verify(req.token, process.env.SECRET, (err, authUser) => {
        console.log(req.authUser);
        if (err) {
          return res.status(SUCCESS_CODE).json({
            status: SUCCESS_CODE,
            success: SUCCESS_MSG,
            message: AUTHENTIFICATED_MSG ,
            token
          });
        }
        next();
      });
      
    } else {
      return res.status(FORBIDDEN_CODE).json({
        status: FORBIDDEN_CODE,
        success: FAIL_MSG,
        message: TOKEN_FORBIDDEN_MSG
      });
    }

  }
}
export default Auth;
