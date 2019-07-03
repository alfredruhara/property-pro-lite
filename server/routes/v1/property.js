import express from 'express';
import PropertyController from '../../controllers/propertyController';
import PropertyValidation from '../../middlewares/validations/propertyValidation';

const router = express.Router();

router
  .route('/create')
  .post(PropertyValidation.create, PropertyController.create);

export default router;
