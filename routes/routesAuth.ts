import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { userRegister, login } from '../controllers/authController';
import points from '../controllers/pointController';
import trucks from '../controllers/truckController';



const router = express.Router();

router.post('/register', userRegister);

router.post('/login', login);

router.get('/points', authMiddleware, points);

router.get('/trucks', authMiddleware, trucks);




export default router;