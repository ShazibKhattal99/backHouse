import express from 'express';
import { registerCustomer, customerExist,getCustomerDetails } from '../controllers/customerUser';

const router = express.Router();

router.post('/register', registerCustomer);
router.get('/customerExist', customerExist);
router.get('/getCustomerDetails', getCustomerDetails);

export default router;
