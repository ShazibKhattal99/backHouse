import express from 'express';
import { registerAdmin, loginAdmin, addClaims, lockSystemByAdmin ,unlockSystemByAdmin} from '../controllers/adminUser';

const router = express.Router();

router.post('/register', registerAdmin); // Create admin
router.post('/login', loginAdmin); // Admin login
router.post('/add-claims', addClaims); // Add claims to an admin
router.post('/lock-system', lockSystemByAdmin); // Lock the system by Grandmaster
router.post('/unlock-system', unlockSystemByAdmin); // Lock the system by Grandmaster
export default router;
