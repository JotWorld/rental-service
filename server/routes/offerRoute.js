import { Router } from 'express';
import upload from '../middleware/upload.js';
import { createOffer, getAllOffers, getFullOffer, getFavoriteOffers, toggleFavorite  } from '../controllers/offerController.js';

const router = Router();


router.get('/offers', getAllOffers);     
router.post(
  '/offers',
  upload.fields([
    { name: 'previewImage', maxCount: 1 },
    { name: 'photos',       maxCount: 6 }
  ]),
  createOffer
);
router.get('/offers/favorite', getFavoriteOffers);
router.post('/offers/favorite/:offerId/:status', toggleFavorite);
router.get('/offers/:id', getFullOffer);

export default router;
