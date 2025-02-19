import express from 'express';
import { registerCustomer, getCustomerDetails } from '../controllers/customerUser';

const router = express.Router();

router.post('/register', registerCustomer);
router.post('/getCustomerDetails', getCustomerDetails);

export default router;
