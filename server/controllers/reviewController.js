// server/controllers/reviewController.js
import Review from '../models/review.js';
import User from '../models/user.js';
import Offer from '../models/offer.js';

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
