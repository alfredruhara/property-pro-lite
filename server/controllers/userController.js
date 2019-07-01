import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel, userDB } from "../models/userModel";
import {
  CREATED_CODE,
  BAD_REQUEST_CODE,
  ERROR_CODE,
  SUCCESS_CODE,
  UNAUTHORIZED_CODE
} from "../constantes/statusCodes";
import { SUCCESS_MSG } from "../constantes/statusMessages";
import { EMAIL_EXIST } from "../constantes/customeMessages";
import Errors from "../helpers/errors";
import dotenv from "dotenv";
dotenv.config();

/**
 * Contains user controllers
 *
 * @class UserController
 */
export class UserController {
  /**
   * Controller to sign up a user
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns
   * @memberof User
   */
  static async signup(req, res) {
    const userExist = userDB.find(user => req.body.email === user.email);

    if (userExist) {
      return res.status(BAD_REQUEST_CODE).json({
        status: BAD_REQUEST_CODE,
        error: EMAIL_EXIST
      });
    } else {
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        address,
        isAdmin
      } = req.body;

      try {
        const pass_salt = await bcrypt.genSalt(10);
        // Removed - 
        const hashed_pass = await bcrypt.hash(password, pass_salt);

        const createdUser = new userModel({
          id: userDB.length + 1,
          email,
          firstName,
          lastName,
          password: hashed_pass,
          phoneNumber,
          address,
          isAdmin
        });

        userDB.push(createdUser);


        const { id } = createdUser;
        const token = jwt.sign({ id }, process.env.SECRET, {
          expiresIn: "24h"
        });
      
        //createdUser.password = undefined;

        return res.status(CREATED_CODE).json({
          status: SUCCESS_MSG,
          data: Object.assign({ token }, createdUser)
        });
      } catch (e) {
        Errors.errorResponse(res, e);
      }
    }
  }

  /**
   * Login the user
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns
   * @memberof User
   */
  static async signin(req, res) {
    const { email, password } = req.body;

    try {
      const user = userDB.find( e => email === e.email);
      
      if (user) {
        
        const match = await bcrypt.compare(password, user.password);
        user.password = undefined;

        const { id } = user;
        const token = jwt.sign({ id }, process.env.SECRET, {
          expiresIn: "24h"
        });

        if (match) {
          return res.status(SUCCESS_CODE).json({
            status: SUCCESS_MSG,
            data: Object.assign({ token }, user)
          });
        }

        return res.status(UNAUTHORIZED_CODE).json({
          status: UNAUTHORIZED_CODE,
          message: "Wrong password"
        });
      }

      return res.status(ERROR_CODE).json({
        status: ERROR_CODE,
        message: "User not found for the given email"
      });
    } catch (e) {
      Errors.errorResponse(res, e);
    }
    return ;
  }
}
export default UserController;
