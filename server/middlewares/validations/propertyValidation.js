import Joi from '@hapi/joi';
import Errors from '../../helpers/errors';

class PropertyValidation {
  static create(req, res, next) {
    const schema = Joi.object().keys({
      title: Joi.string().min(6).max(50).required(),
      status: Joi.bool().valid(true, false).required(),
      price: Joi.number().required(),
      state: Joi.string().min(2).max(30).required(),
      city: Joi.string().min(2).max(30).required(),
      address: Joi.string().min(5).max(30).required(),
      type: Joi.string().min(2).max(30).required(),
      imageUrl: Joi.string().min(2).max(30).required(),
      description: Joi.string().min(10).max(255).required(),
      kindOfTrade: Joi.string().valid('rent', 'sold').required()
    });

    const result = Joi.validate(req.body, schema);

    if (!result.error) {
      return next();
    }
    return Errors.joiErrorResponse(res, result.error);
  }
}

export default PropertyValidation;
