import express from 'express';
import PropertyController from '../../controllers/propertyController';
import PropertyValidation from '../../middlewares/validations/propertyValidation';
import auth from '../../middlewares/authentification/auth';

const router = express.Router();

router
  .route('/')
  .get(PropertyController.all);

router
  .route('/agent')
  .get(auth.verifyToken, PropertyController.agentProperty);

router
  .route('/agent/trade')
  .get(auth.verifyToken, PropertyController.agentPropertyTrade);

router
  .route('/create')
  .post(PropertyValidation.create, auth.verifyToken, PropertyController.create);

router
  .route('/view/:id')
  .get(PropertyController.view);

router
  .route('/update/:id')
  .patch(PropertyValidation.create, auth.verifyToken, PropertyController.update);

router
  .route('/delete/:id')
  .delete(auth.verifyToken, PropertyController.delete);

router
  .route('/trade/:id')
  .patch(auth.verifyToken, PropertyController.trade);

router
  .route('/untrade/:id')
  .patch(auth.verifyToken, PropertyController.untrade);

router
  .route('/filter/')
  .get(PropertyController.filter);

export default router;
