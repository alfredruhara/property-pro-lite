import Joi from '@hapi/joi';
import Errors from '../../helpers/errors';
/**
 * Contains validations for the user
 *
 * @class User
 */
class UserValidation {
  /**
   * Validates the signup body
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   * @memberof User
   */
  static signup(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      firstName: Joi.string().min(3).max(25).required(),
      lastName: Joi.string().min(3).max(25).required(),
      password: Joi.string().min(6).max(50).required(),
      phoneNumber: Joi.number().positive().required(),
      address: Joi.string().min(5).max(30).required(),
      isAdmin: Joi.bool().valid(true, false).required()
    });

    const result = Joi.validate(req.body, schema);

    if (!result.error) {
      return next();
    }
    return Errors.joiErrorResponse(res, result.error);
  }

  /**
 * Validates the login body
 *
 * @static
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 * @memberof User
 */
  static signin(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(100).required()
    });

    const result = Joi.validate(req.body, schema);
    if (!result.error) {
      return next();
    }
    return Errors.joiErrorResponse(res, result.error);
  }

  static updateInformations(req, res, next) {
    const schema = Joi.object().keys({
      firstName: Joi.string().min(3).max(25).required(),
      lastName: Joi.string().min(3).max(25).required(),
      phoneNumber: Joi.number().positive().required(),
      address: Joi.string().min(5).max(30).required()
    });

    const result = Joi.validate(req.body, schema);

    if (!result.error) {
      return next();
    }
    return Errors.joiErrorResponse(res, result.error);
  }
}

export default UserValidation;
