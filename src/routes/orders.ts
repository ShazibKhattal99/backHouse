import express from 'express';
import { createOrders, updateOrders ,findOrdersByArtistId,getAllOrders} from '../controllers/order';

const router = express.Router();

router.post('/createOrder', createOrders);
router.put('/orders/:transactionId', updateOrders);
router.get('/orders', findOrdersByArtistId);
router.get('/allOrders', getAllOrders);


export default router;
