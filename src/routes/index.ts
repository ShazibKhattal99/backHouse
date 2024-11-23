import { Router } from 'express';

import firebaseAuthRouter from './firebaseAuth';
import OrderRouter from './orders'
import adminRouter from './admin'

const router = Router();

router.use('/admin', adminRouter);
router.use('/auth', firebaseAuthRouter);
router.use('/order',OrderRouter)

export default router;
