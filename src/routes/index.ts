import { Router } from 'express';

import artistUserRouter from './artistUser';
import adminUserRouter from './adminUser'
import customerUserRouter from './customerUser'
import OrderRouter from './orders'
import { verifyAccessToken } from '../middlewares/authenticateToken'; 
const router = Router();

router.use('/adminUser', adminUserRouter);
router.use('/artistUser',verifyAccessToken, artistUserRouter);
router.use('/customertUser',verifyAccessToken,customerUserRouter);
router.use('/order',verifyAccessToken,OrderRouter)

export default router;
