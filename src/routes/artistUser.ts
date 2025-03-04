import express from 'express';
import { registerUser, getAllArtists,getArtistByPhoneNumber,artistExist} from '../controllers/artistUser';

const router = express.Router();

router.post('/register', registerUser);
router.get('/artistExist', artistExist);
router.get('/artists', getAllArtists);
router.get('/artist', getArtistByPhoneNumber); 
export default router;
