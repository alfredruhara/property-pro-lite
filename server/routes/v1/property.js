import express from 'express';
import PropertyController from '../../controllers/propertyController';
import PropertyValidation from '../../middlewares/validations/propertyValidation';

const router = express.Router();

router
  .route('/create')
  .post(PropertyValidation.create, PropertyController.create);

router
  .route('/')
  .get(PropertyController.all);

router
  .route('/view/:id')
  .get(PropertyController.view);


export default router;
