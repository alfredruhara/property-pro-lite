import express from 'express';
import userValidations from '../../middlewares/validations/userValidation';
import userController from '../../controllers/userController';
import auth from '../../middlewares/authentification/auth';

const router = express.Router();

router.route('/signup')
  .post(userValidations.signup, userController.signup);

router.route('/signin')
  .post(userValidations.signin, userController.signin);

router.route('/')
  .get(userController.agents);

router.route('/')
  .patch(userValidations.updateInformations, auth.verifyToken, userController.updateInformations);

router.route('/changepassword')
  .patch(userValidations.changePassword, auth.verifyToken, userController.changePassword);

router.route('/changeavatar')
  .patch(userValidations.changeAvatar, auth.verifyToken, userController.changeAvatar);

export default router;
