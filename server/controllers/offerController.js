import Offer from '../models/offer.js';
import ApiError from '../error/ApiError.js';
import { adaptOfferToClient } from '../adapters/offerAdapter.js';
import User     from '../models/user.js';
import { adaptFullOfferToClient } from '../adapters/offerAdapter.js';

export async function getAllOffers(_req, res, next) {
  try {
    const offers = await Offer.findAll();
    const adapted = offers.map(adaptOfferToClient);
    return res.json(adapted);
  } catch (error) {
    return next(ApiError.internal('Не удалось получить офферы: ' + error.message));
  }
}


export async function createOffer(req, res, next) {
 try {
   const {
     title, description, publishDate, city,
     isPremium, isFavorite, rating, type, rooms, guests, price,
     features, commentsCount, latitude, longitude, userId
   } = req.body;


   if (!req.files?.previewImage || req.files.previewImage.length === 0) {
     return next(ApiError.badRequest('Превью изображение обязательно для загрузки'));
   }


   const previewImagePath = `/static/${req.files.previewImage[0].filename}`;


   let processedPhotos = [];
   if (req.files?.photos) {
     processedPhotos = req.files.photos.map(file => `/static/${file.filename}`);
   }


   let parsedFeatures = [];
   if (features) {
     try {
       parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;
     } catch {
       parsedFeatures = features.split(',');
     }
   }


   const offer = await Offer.create({
     title,
     description,
     publishDate,
     city,
     previewImage: previewImagePath,
     photos: processedPhotos,
     isPremium,
     isFavorite,
     rating,
     type,
     rooms,
     guests,
     price,
     features: parsedFeatures,
     commentsCount,
     latitude,
     longitude,
     authorId: userId
   });


   return res.status(201).json(offer);
 } catch (error) {
   next(ApiError.internal('Не удалось добавить предложение: ' + error.message));
 }
}
export async function getFullOffer(req, res, next) {
  try {
    const { id } = req.params;

    // находим оффер и сразу подгружаем автора
    const offer = await Offer.findByPk(id, {
      include: { model: User, as: 'author' }
    });

    if (!offer) {
      return next(ApiError.badRequest('Offer not found'));
    }

    // адаптируем под клиента и отдаем
    const result = adaptFullOfferToClient(offer);
    return res.json(result);
  } catch (e) {
    return next(ApiError.internal('Не удалось получить оффер: ' + e.message));
  }
}
export async function getFavoriteOffers(_req, res, next) {
  try {
    const offers = await Offer.findAll({ where: { isFavorite: true } });
    const adapted = offers.map(adaptOfferToClient);
    return res.json(adapted);
  } catch (e) {
    return next(ApiError.internal('Не удалось получить избранное: ' + e.message));
  }
}
export async function toggleFavorite(req, res, next) {
  try {
    const { offerId, status } = req.params;
    const isFav = status === 'true';
    const [count, [updated]] = await Offer.update(
      { isFavorite: isFav },
      { where: { id: offerId }, returning: true }
    );
    if (!count) return next(ApiError.notFound('Offer not found'));
    return res.json(adaptOfferToClient(updated));
  } catch (e) {
    return next(ApiError.internal('Не удалось изменить избранное: ' + e.message));
  }
}