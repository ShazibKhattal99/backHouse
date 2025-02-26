import express from 'express';
import { registerUser, getAllArtists,getArtistByPhoneNumber } from '../controllers/artistUser';

const router = express.Router();

router.post('/register', registerUser);
router.get('/artists', getAllArtists);
router.get('/artist', getArtistByPhoneNumber); 
export default router;
