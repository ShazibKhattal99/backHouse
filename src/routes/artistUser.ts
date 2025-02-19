import express from 'express';
import { registerUser, loginUser, getAllArtists } from '../controllers/artistUser';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/artists', getAllArtists);

export default router;
