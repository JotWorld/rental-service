import { Router } from 'express';
import upload from '../middleware/upload.js';
import { registration, login, checkAuth, logout  } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';


const router = Router();
router.post('/login', login);
router.get('/login', authenticateToken, checkAuth);
router.delete('/logout', logout);
router.post(
  '/register',      
  upload.single('avatar'),
  registration
);


export default router;
