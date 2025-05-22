// server/routes/reviewRoute.js

import { Router } from 'express';
import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
} from '../controllers/reviewController.js';

const router = Router();

// GET /reviews — получить все отзывы
router.get('/', getAllReviews);

// GET /reviews/:id — получить один отзыв по ID
router.get('/:id', getReviewById);

// POST /reviews — создать новый отзыв
router.post('/', createReview);

// PUT /reviews/:id — обновить отзыв по ID
router.put('/:id', updateReview);

// DELETE /reviews/:id — удалить отзыв по ID
router.delete('/:id', deleteReview);

export default router;
