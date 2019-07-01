import express from 'express';
import userValidations from '../../middlewares/validations/userValidation';
import userController from '../../controllers/userController';

const router = express.Router();

router.route('/signup')
  .post(userValidations.signup, userController.signup);

router.route('/signin')
  .post(userValidations.signin, userController.signin);

router.route('/agents')
  .get(userController.agents);

router.route('/:id')
  .put(userValidations.updateInformations, userController.updateInformations);

export default router;
