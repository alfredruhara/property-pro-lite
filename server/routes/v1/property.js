import express from 'express';
import PropertyController from '../../controllers/propertyController';
import PropertyValidation from '../../middlewares/validations/propertyValidation';
import Tmp from '../../middlewares/access/tmp';

const router = express.Router();

router
  .route('/')
  .get(PropertyController.all);

router
  .route('/agent/')
  .get(Tmp.session, PropertyController.agentProperty);

router
  .route('/agent/trade')
  .get(Tmp.session, PropertyController.agentPropertyTrade);

router
  .route('/create')
  .post(PropertyValidation.create, Tmp.session, PropertyController.create);

router
  .route('/view/:id')
  .get(PropertyController.view);

router
  .route('/update/:id')
  .patch(PropertyValidation.create, Tmp.session, PropertyController.update);

router
  .route('/delete/:id')
  .delete(Tmp.session, PropertyController.delete);

router
  .route('/trade/:id')
  .patch(Tmp.session, PropertyController.trade);

router
  .route('/untrade/:id')
  .patch(Tmp.session, PropertyController.untrade);

router
  .route('/filter/')
  .get(PropertyController.filter);

export default router;
