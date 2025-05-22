import { Router } from 'express';
import offerRouter  from './offerRoute.js';
import reviewRouter from './reviewRoute.js';
import userRouter   from './userRoute.js';

const router = Router();

router.use('/offers',  offerRouter);  
router.use('/reviews', reviewRouter);
router.use('/users',   userRouter);

export default router;               
