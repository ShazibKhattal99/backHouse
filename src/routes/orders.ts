import express from 'express';
import { createOrders, updateOrders, findOrdersById, getAllOrders } from '../controllers/order';

const router = express.Router();

router.post('/createOrder', createOrders);
router.put('/orders/:transactionId', updateOrders);
router.get('/orders', findOrdersById);
router.get('/allOrders', getAllOrders);

export default router;
