import express from 'express';
import { createOrders, updateOrders, findOrdersByArtistId, getAllOrders } from '../controllers/order';
import { verifyAccessToken } from '../middlewares/authenticateToken'; 

const router = express.Router();

router.post('/createOrder', verifyAccessToken, createOrders);
router.put('/orders/:transactionId', verifyAccessToken, updateOrders);
router.get('/orders', verifyAccessToken, findOrdersByArtistId);
router.get('/allOrders', verifyAccessToken, getAllOrders);

export default router;
