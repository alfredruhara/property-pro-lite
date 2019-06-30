import express from 'express';
import userValidations from '../../middlewares/validations/userValidation';
import userController from '../../controllers/userController';

const router = express.Router();

router.route('/signup')
  .post(userValidations.signup, userController.signup);

export default router;
