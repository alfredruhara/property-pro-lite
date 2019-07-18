import jwt from "jsonwebtoken";
import omit from 'object.omit';
import bcrypt from "bcrypt";
import userQueries from "../models/userModel";

import {
  CREATED_CODE,
  ERROR_CODE,
  SUCCESS_CODE,
  UNAUTHORIZED_CODE
} from "../constantes/statusCodes";
import { EMAIL_EXIST } from "../constantes/customeMessages";
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

    const pass_salt = await bcrypt.genSalt(10);
    const hashed_pass = await bcrypt.hash(req.body.password, pass_salt);

    const values =  [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.phoneNumber,
      hashed_pass
     ];
    // save the user into the database
    const result = await userQueries.create(values);

    if (result.error) {
      res.status(result.error.status).json({
        status: result.error.status,
        error: result.error.message,
      });
      return;
    }
    // rnew Id 
    const { id } = result.rows[0];
   
    const token = jwt.sign({ id, }, process.env.SECRET, {
      expiresIn: "24h"
    });

    req.body = Object.assign({ token, id }, req.body);
    req.body.password = undefined;

    res.status(CREATED_CODE).json({
      status: CREATED_CODE,
      message: 'Account successfully created',
      data: req.body
    });

  }

  /**
   * Signin the user
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns
   * @memberof User
   */
  static async signin(req, res) {

    const values = [
      req.body.email
    ];
  
    const result = await userQueries.signin(values);
  
    if (result.error) {
      res.status(403).json({
        status: 403,
        error: result.error.message
      });
      return;
    }
  
    if (result.rowCount <= 0) {
      res.status(404).json({
        status: 404,
        error: 'The user does not exist'
      });
      return;
    }
  
    bcrypt.compare(req.body.password, result.rows[0].password, (error, data) => {
      if (error) {
        res.status(500).json({
          status: 500,
          error: 'A bcrypt error has occured'
        });
        return;
      }
  
      if (!data) {
        res.status(401).json({
          status: 401,
          error: 'Email or password incorrect'
        });
        return;
      }
  
      const { id, email } = result.rows[0];
  
      // Sign the token
      const token = jwt.sign({ id, email }, process.env.SECRET , { expiresIn: '24h' });

      const userInfos =  Object.assign( {token} , result.rows[0]);

      userInfos.password = undefined;

      // The authentification has succeeded
      res.status(200).json({
        status: 200,
        message :'Successfully sign in',
        data: userInfos
      });
    });
  }
  /**
   * List agents
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns
   * @memberof User
   */
  static async agents(req, res){

    const result =  await userQueries.agents();
    if (result.rowCount < 1 ) {
      return res.status(ERROR_CODE).json({
        status : ERROR_CODE,
        message : "User agent data unavailable"
      });
    }
    
    return res.status(SUCCESS_CODE).json({
      status : SUCCESS_CODE,
      message : 'List of agents',
      data: result.rows
    });
  }
  
  /**
   * User update informations
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns
   * @memberof User
   */
  static async updateInformations(req,res){
    const { firstName, lastName, phoneNumber, address } = req.body;
        // eslint-disable-next-line radix
        const values = [
          req.body.firstName,
          req.body.lastName,
          req.body.phoneNumber,
          req.body.address,
          req.user.id
        ];
    
        const result = await userQueries.updateInformations(values);

        if (result.error){
          res.status(result.error.status).json({
            status : result.error.status,
            message : result.error.message,
            error : result.error.error
          })
        }
        
        if (result.rowCount > 0) {
          return res.status(SUCCESS_CODE).json({
            status: SUCCESS_CODE,
            message: 'Informations  Successfully updated',
            data: result.rows[0]
          });
        }
        return res.status(ERROR_CODE).json({
          status: ERROR_CODE,
          message: 'Unknown user',
          data: result.rows[0]
        });
    
  }
    /**
   * User change informations
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns
   * @memberof User
   */
  static async changePassword(req,res){

    const { oldPassword, newPassword, confirmPassword } = req.body;
    const user = await userQueries.findUser([req.user.id]);

    if (user.error){
      res.status(user.error.status).json({
        status : user.error.status,
        message : user.error.message,
        error : user.error.error
      })
    }

    const match = await bcrypt.compare(oldPassword, user.rows[0].password);

    if (match) {

      if (newPassword == confirmPassword){
        const pass_salt = await bcrypt.genSalt(10);
        const hashed_pass = await bcrypt.hash(newPassword, pass_salt);

        const result = await userQueries.changePassword([hashed_pass,req.user.id]);

        if (user.error){
          res.status(user.error.status).json({
            status : user.error.status,
            message : user.error.message,
            error : user.error.error
          })
        }

        return res.status(SUCCESS_CODE).json({
          status : SUCCESS_CODE,
          message : 'Password successfully changed'
        });

      }else{
        return res.status(UNAUTHORIZED_CODE).json({
          status: UNAUTHORIZED_CODE,
          message: "Password does not macth"
        });
      }

      
    }

    return res.status(UNAUTHORIZED_CODE).json({
      status: UNAUTHORIZED_CODE,
      message: "Wrong old password"
    });

  
  }

   /**
   * User Change avatar picture
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns
   * @memberof User
   */
  static async changeAvatar(req,res){

  //   const { avatarUrl } = req.body;
  //   const user_id = req.user.id;

  //   let userOnChangeAvatar = userDB.find(checkId => checkId.id === user_id );

  //   if (userOnChangeAvatar){

  //     userOnChangeAvatar.avatar = avatarUrl

  //     return res.status(SUCCESS_CODE).json({
  //       status : SUCCESS_CODE,
  //       message : 'Avatar picture successfully changed',
  //       data : { avatarUrl }
  //     });

  //   }

  //   return res.status(ERROR_CODE).json({
  //     status: ERROR_CODE,
  //     message: 'Unknow user'
  //   });
  
   }

}
export default UserController;
