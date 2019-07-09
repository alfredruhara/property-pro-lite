import express from 'express';
import user from './user';
import property from './property';

const router = express.Router();

router.use('/user', user);

router.use('/property', property);

export default router;
