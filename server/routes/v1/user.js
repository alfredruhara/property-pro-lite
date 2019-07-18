import express from 'express';
import multiplex from 'connect-multiparty';
import userValidations from '../../middlewares/validations/userValidation';
import userController from '../../controllers/userController';
import auth from '../../middlewares/authentification/auth';

const multi = multiplex();
const router = express.Router();

router.route('/signup')
  .post(userValidations.signup, userController.signup);

router.route('/signin')
  .post(userValidations.signin, userController.signin);

router.route('/')
  .get(userController.agents);

router.route('/')
  .patch(auth.verifyToken, userValidations.updateInformations, userController.updateInformations);

router.route('/changepassword')
  .patch(auth.verifyToken, userValidations.changePassword, userController.changePassword);

router.route('/changeavatar')
  .patch(auth.verifyToken, multi, userController.changeAvatar);

router.route('/resetpassword')
  .post(userValidations.resetPassword, userController.resetpassword);

export default router;
