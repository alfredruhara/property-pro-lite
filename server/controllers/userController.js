import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel, userDB, tmpSession } from "../models/userModel";
import {
  CREATED_CODE,
  BAD_REQUEST_CODE,
  ERROR_CODE,
  SUCCESS_CODE,
  UNAUTHORIZED_CODE
} from "../constantes/statusCodes";
import { SUCCESS_MSG, INTERNAL_SERVER_ERROR_MSG, FAIL_MSG, BAD_REQUEST_MSG } from "../constantes/statusMessages";
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

    try {
      const user = userDB.find( e => email === e.email);
      
      if (user) {
        
        const match = await bcrypt.compare(password, user.password);

        if (match) {

          const { id, firstName, lastName } = user;
          const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: "24h"
          });

          const names = firstName + " " + lastName ;
          const connectModel = {
            token ,
            id ,
            names
          };
          
          tmpSession.push(connectModel);

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

    if (userDB.length < 1 ) {
      return res.status(ERROR_CODE).json({
        status : FAIL_MSG,
        message : "User agent data unavailable"
      });
    
    }
    let agentDB = [];

    for(let i = 0; i < userDB.length; i++) {
      let user = userDB[i];

      if (user.isAdmin) {

        let agentModel = {
          firstName : user.firstName,
          lastName : user.lastName,
          email : user.email,
          phoneNumber :user.phoneNumber,
          address : user.address
        };

        const isAvatar = Object.keys(agentModel).some(v => v == 'avatar'); 

        if (!isAvatar){
            agentModel.avatar = 'avatar.png';
        }
        
        agentDB.push(agentModel);

      }

    }

      return res.status(SUCCESS_CODE).json({
        "status" : SUCCESS_MSG,
        "data": agentDB
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

    let userOnUpdate = userDB.find(checkId => checkId.id === parseInt(req.params.id));

    if (userOnUpdate){

      userOnUpdate.email = firstName, 
      userOnUpdate.firstName = lastName, 
      userOnUpdate.lastName = phoneNumber, 
      userOnUpdate.phoneNumber = req.body.phoneNumber, 
      userOnUpdate.address = address

      return res.status(SUCCESS_CODE).json({
        "status" : SUCCESS_MSG,
        data : userOnUpdate
      });

    }

    return res.status(BAD_REQUEST_CODE).json({
      status: BAD_REQUEST_MSG,
      message: 'Unknow a user with that ID'
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

    let userOnChangePass = userDB.find(checkId => checkId.id === parseInt(req.params.id));

      if (userOnChangePass) {

        const match = await bcrypt.compare(oldPassword, userOnChangePass.password);

        if (match) {

          if (newPassword == confirmPassword){
            const pass_salt = await bcrypt.genSalt(10);
            const hashed_pass = await bcrypt.hash(newPassword, pass_salt);

            userOnChangePass.password = hashed_pass
      
            return res.status(SUCCESS_CODE).json({
              "status" : SUCCESS_MSG,
              'message' : 'password changed',
                data : userOnChangePass
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

    return res.status(BAD_REQUEST_CODE).json({
      status: BAD_REQUEST_MSG,
      message: 'Unknow a user with that ID'
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

    const { avatarUrl } = req.body;

    let userOnChangeAvatar = userDB.find(checkId => checkId.id === parseInt(req.params.id));

    if (userOnChangeAvatar){

      userOnChangeAvatar.avatar = avatarUrl

      return res.status(SUCCESS_CODE).json({
        "status" : SUCCESS_MSG,
         data : userOnChangeAvatar
      });

    }

    return res.status(BAD_REQUEST_CODE).json({
      status: BAD_REQUEST_MSG,
      message: 'Unknow a user with that ID'
    });
  
  }

}
export default UserController;
