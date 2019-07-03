import express from 'express';
import PropertyController from '../../controllers/propertyController';
import PropertyValidation from '../../middlewares/validations/propertyValidation';
import Tmp from '../../middlewares/access/tmp';

const router = express.Router();

router
  .route('/')
  .get(PropertyController.all);

router
  .route('/create')
  .post(PropertyValidation.create, Tmp.session, PropertyController.create);

router
  .route('/view/:id')
  .get(PropertyController.view);

router
  .route('/delete/:id')
  .delete(Tmp.session, PropertyController.delete);

export default router;
