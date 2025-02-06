import { Router } from 'express';

import artistUserRouter from './artistUser';
import adminUserRouter from './adminUser'
import OrderRouter from './orders'

const router = Router();

router.use('/adminUser', adminUserRouter);
router.use('/artistUser', artistUserRouter);
router.use('/order',OrderRouter)

export default router;
