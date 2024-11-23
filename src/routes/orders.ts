import express from 'express';
import { createOrders, updateOrders ,getOrdersByUserId} from '../controllers/order';

const router = express.Router();

router.post('/createOrder', createOrders);
router.put('/orders/:transactionId', updateOrders);
router.get('/allOrders', getOrdersByUserId);


export default router;
