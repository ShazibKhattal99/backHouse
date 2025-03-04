import { Router } from 'express';

import artistUserRouter from './artistUser';
import adminUserRouter from './adminUser'
import customerUserRouter from './customerUser'
import OrderRouter from './orders'
// import { verifyAccessToken } from '../middlewares/authenticateToken'; 
const router = Router();
router.use('/adminUser', adminUserRouter);
router.use('/artistUser', artistUserRouter);
router.use('/customertUser',customerUserRouter);
router.use('/order',OrderRouter)

export default router;
