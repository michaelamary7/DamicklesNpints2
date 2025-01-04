import { Router } from 'express';
import { menuRouter } from './menuRoutes.js';
import { authRouter } from './authRoutes.js';

const router = Router();

router.use('/menu', menuRouter);
router.use('/auth', authRouter);

export default router;
