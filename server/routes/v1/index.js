import express from 'express';
import user from './user';

const router = express.Router();

router.use('/auth', user);
router.use('/user', user);

export default router;
