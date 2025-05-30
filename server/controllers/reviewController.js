
import Review from '../models/review.js';
import User from '../models/user.js';
import Offer from '../models/offer.js';
import ApiError from '../error/ApiError.js';
import { adaptReviewToClient } from '../adapters/reviewAdapter.js';
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        { model: User,   as: 'author', attributes: ['id', 'username', 'email'] },
        { model: Offer,  attributes: ['id', 'title'] }
      ]
    });
    res.json(reviews);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id, {
      include: [{ model: User, as: 'author', attributes: ['id', 'username'] }]
    });
    if (!review) return res.status(404).json({ error: 'Review not found' });
    res.json(review);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const createReview = async (req, res) => {
  try {
    const { text, rating, authorId, offerId } = req.body;
    const review = await Review.create({ text, rating, authorId, offerId });
    res.status(201).json(review);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Review.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ error: 'Review not found' });
    const review = await Review.findByPk(id);
    res.json(review);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const deleted = await Review.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Review not found' });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
export async function addReview(req, res, next) {
  try {
    const { offerId } = req.params;
    const { text, rating, userId } = req.body;
    if (!text || !rating || !offerId || !userId) {
      return next(ApiError.badRequest('Некорректные данные для отзыва'));
    }
    const review = await Review.create({
      text,
      rating,
      offerId,
      authorId: userId
    });
    return res.status(201).json(review);
  } catch (e) {
    return next(ApiError.internal('Не удалось создать отзыв: ' + e.message));
  }
}



export async function getReviewsByOfferId(req, res, next) {
  try {
    const { offerId } = req.params;
    const reviews = await Review.findAll({
      where: { offerId },
      include: { model: User, as: 'author' }
    });
    const adapted = reviews.map(adaptReviewToClient);
    return res.json(adapted);
  } catch (e) {
    return next(ApiError.internal('Не удалось получить отзывы: ' + e.message));
  }
}
