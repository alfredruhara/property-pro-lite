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

router
  .route('/update/:id')
  .patch(PropertyValidation.create, Tmp.session, PropertyController.update);

router
  .route('/trade/:id')
  .patch(Tmp.session, PropertyController.trade);

router
  .route('/untrade/:id')
  .patch(Tmp.session, PropertyController.untrade);

export default router;
