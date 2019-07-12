import express from 'express';
import user from './user';
import property from './property';

const router = express.Router();

router.use('/v1/user', user);
router.use('/v1/auth', user);

router.use('/v1', property);
export default router;
