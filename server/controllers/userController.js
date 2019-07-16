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






    
     const { email, password } = req.body;

     const pass_salt = await bcrypt.genSalt(10);
     const hashed_pass = await bcrypt.hash(password, pass_salt);

   

    // try {
    //   const user = userDB.find( e => email === e.email);
      
    //   if (user) {
        
    //     const match = await bcrypt.compare(password, user.password);

    //     if (match) {

    //       const { id, firstName, lastName, email, phoneNumber } = user;
    //       const token = jwt.sign({ id , firstName, lastName, email, phoneNumber }, process.env.SECRET, {
    //         expiresIn: "24h"
    //       });

    //       const water =  Object.assign({ token }, user) ;
    //       const purified = omit(water, 'password');

    //       return res.status(SUCCESS_CODE).json({
    //         status: SUCCESS_CODE,
    //         message: 'Successfully login',
    //         data: purified
    //       });

    //     }

    //     return res.status(UNAUTHORIZED_CODE).json({
    //       status: UNAUTHORIZED_CODE,
    //       message: "Email or password incorrect"
    //     });
    //   }

    //   return res.status(ERROR_CODE).json({
    //     status: ERROR_CODE,
    //     message: "User not found for the given email"
    //   });
    // } catch (e) {
    // return res.status(INTERNAL_SERVER_ERROR_CODE).json(INTERNAL_SERVER_ERROR_CODE)
    // }
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
  static agents(req, res){

    // if (userDB.length < 1 ) {
    //   return res.status(ERROR_CODE).json({
    //     status : ERROR_CODE,
    //     message : "User agent data unavailable"
    //   });
    
    // }
    // let agentDB = [];

    // for(let i = 0; i < userDB.length; i++) {
    //   let user = userDB[i];

    //     let agentModel = {
    //       firstName : user.firstName,
    //       lastName : user.lastName,
    //       email : user.email,
    //       phoneNumber :user.phoneNumber,
    //       address : user.address
    //     };

    //     const isAvatar = Object.keys(agentModel).some(v => v == 'avatar'); 
    //     agentDB.push(agentModel);
    // }

    //   return res.status(SUCCESS_CODE).json({
    //     status : SUCCESS_CODE,
    //     message : 'List of agents',
    //     data: agentDB
    //   });
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

    // const { firstName, lastName, phoneNumber, address } = req.body;

    // let userOnUpdate = userDB.find(checkId => checkId.id === parseInt(req.user.id));

    // if (userOnUpdate){

    //   userOnUpdate.firstName = firstName, 
    //   userOnUpdate.lastName = lastName, 
    //   userOnUpdate.phoneNumber = phoneNumber, 
    //   userOnUpdate.address = address
      
    //   const tmpHolder = {
    //     firstName,
    //     lastName,
    //     phoneNumber,
    //     address
    //   }

    //   return res.status(SUCCESS_CODE).json({
    //     status: SUCCESS_CODE,
    //     message: 'Information  Successfully updated',
    //     data: tmpHolder
    //   });

    // }

    // return res.status(ERROR_CODE).json({
    //   status: ERROR_CODE,
    //   message: 'Unknow a user with that ID'
    // });
  
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

    // const { oldPassword, newPassword, confirmPassword } = req.body;
   
    // let userOnChangePass = userDB.find(checkId => checkId.id === parseInt(req.user.id));

    //   if (userOnChangePass) {

    //     const match = await bcrypt.compare(oldPassword, userOnChangePass.password);

    //     if (match) {

    //       if (newPassword == confirmPassword){
    //         const pass_salt = await bcrypt.genSalt(10);
    //         const hashed_pass = await bcrypt.hash(newPassword, pass_salt);

    //         userOnChangePass.password = hashed_pass

    //         return res.status(SUCCESS_CODE).json({
    //           status : SUCCESS_CODE,
    //           message : 'Password successfully changed'
    //         });

    //       }else{
    //         return res.status(UNAUTHORIZED_CODE).json({
    //           status: UNAUTHORIZED_CODE,
    //           message: "Password does not macth"
    //         });
    //       }

          
    //     }

    //     return res.status(UNAUTHORIZED_CODE).json({
    //       status: UNAUTHORIZED_CODE,
    //       message: "Wrong old password"
    //     });


    //   }

    // return res.status(ERROR_CODE).json({
    //   status: ERROR_CODE,
    //   message: 'Unknow a user with that ID'
    // });
  
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
