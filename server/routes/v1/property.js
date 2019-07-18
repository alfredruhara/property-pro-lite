import express from 'express';
import multiplex from 'connect-multiparty';
import PropertyController from '../../controllers/propertyController';
import PropertyValidation from '../../middlewares/validations/propertyValidation';
import auth from '../../middlewares/authentification/auth';

const multi = multiplex();
const router = express.Router();

router.route('/property/')
  .post(auth.verifyToken, PropertyValidation.create, multi, PropertyController.create);

router.route('/property/')
  .get(PropertyController.all);

router
  .route('/property/agent')
  .get(auth.verifyToken, PropertyController.agentProperty);

router
  .route('/property/agent/sold')
  .get(auth.verifyToken, PropertyController.agentPropertyTrade);

router
  .route('/property/:id')
  .get(PropertyController.view);

router
  .route('/property/:id')
  .patch(auth.verifyToken, PropertyValidation.update, PropertyController.update);

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
  .route('/property/filter/search/')
  .get(PropertyController.filter);

export default router;
