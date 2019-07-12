import express from 'express';
import PropertyController from '../../controllers/propertyController';
import PropertyValidation from '../../middlewares/validations/propertyValidation';
import auth from '../../middlewares/authentification/auth';

const router = express.Router();

router.route('/property/')
  .post(PropertyValidation.create, auth.verifyToken, PropertyController.create);

router.route('/property/')
  .get(PropertyController.all);

router
  .route('/property/agent')
  .get(auth.verifyToken, PropertyController.agentProperty);

router
  .route('/property/agent/sold')
  .get(auth.verifyToken, PropertyController.agentPropertyTrade);

router
  .route('/property/view/:id')
  .get(PropertyController.view);

router
  .route('/property/:id')
  .patch(PropertyValidation.create, auth.verifyToken, PropertyController.update);

router
  .route('/property/:id')
  .delete(auth.verifyToken, PropertyController.delete);

router
  .route('/property/:id/sold')
  .patch(auth.verifyToken, PropertyController.trade);

router
  .route('/property/:id/unsold')
  .patch(auth.verifyToken, PropertyController.untrade);

router
  .route('/property/filter/')
  .get(PropertyController.filter);

export default router;
