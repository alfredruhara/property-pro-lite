import express from 'express';
import userValidations from '../../middlewares/validations/userValidation';
import userController from '../../controllers/userController';
import auth from '../../middlewares/authentification/auth';

const router = express.Router();

router.route('/signup')
  .post(userValidations.signup, userController.signup);

router.route('/signin')
  .post(userValidations.signin, userController.signin);

router.route('/agents')
  .get(userController.agents);

router.route('/updateinformation')
  .put(userValidations.updateInformations, auth.verifyToken, userController.updateInformations);

router.route('/changepassword')
  .put(userValidations.changePassword, auth.verifyToken, userController.changePassword);

router.route('/changeavatar')
  .put(userValidations.changeAvatar, auth.verifyToken, userController.changeAvatar);

export default router;
