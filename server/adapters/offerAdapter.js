// server/adapters/offerAdapter.js

// Координаты городов
const cityCoordinates = {
  Paris:      { latitude: 48.8566, longitude: 2.3522, zoom: 13 },
  Cologne:    { latitude: 50.9375, longitude: 6.9603, zoom: 13 },
  Brussels:   { latitude: 50.8503, longitude: 4.3517, zoom: 13 },
  Amsterdam:  { latitude: 52.3676, longitude: 4.9041, zoom: 13 },
  Hamburg:    { latitude: 53.5511, longitude: 9.9937, zoom: 13 },
  Dusseldorf: { latitude: 51.2277, longitude: 6.7735, zoom: 13 }
};

// Базовый URL сервера
export const getBaseUrl = () => {
  const host = process.env.HOST || 'http://localhost';
  const port = process.env.PORT || '5000';
  return `${host}:${port}`;
};

/**
 * Приводит сырые данные Offer к нужному клиенту формату:
 * - Строковые ID
 * - Только базовый набор полей
 * - Полный URL previewImage
 */
export function adaptOfferToClient(offer) {
  const baseUrl      = getBaseUrl();
  const cityLocation = cityCoordinates[offer.city] || {};
  let previewImage   = offer.previewImage || '';

  // Если путь не полный, дополняем его хостом
  if (previewImage && !previewImage.startsWith('http')) {
    const slash = previewImage.startsWith('/') ? '' : '/';
    previewImage = `${baseUrl}${slash}${previewImage}`;
  }

  return {
    id:           String(offer.id),
    title:        offer.title,
    type:         offer.type,
    price:        offer.price,
    city: {
      name:     offer.city,
      location: cityLocation
    },
    location: offer.latitude != null && offer.longitude != null
      ? { latitude: offer.latitude, longitude: offer.longitude }
      : { latitude: 0, longitude: 0 },
    isFavorite:   Boolean(offer.isFavorite),
    isPremium:    Boolean(offer.isPremium),
    rating:       parseFloat(offer.rating),
    previewImage
  };
}


export function adaptFullOfferToClient(offer) {
  const baseUrl = getBaseUrl();

  // полный URL для previewImage
  const previewImage = offer.previewImage.startsWith('http')
    ? offer.previewImage
    : `${baseUrl}${offer.previewImage.startsWith('/') ? '' : '/'}${offer.previewImage}`;

  // полный URL для всех photos
  const photos = offer.photos.map(p =>
    p.startsWith('http') ? p : `${baseUrl}${p.startsWith('/') ? '' : '/'}${p}`
  );

  return {
    id:            String(offer.id),
    title:         offer.title,
    description:   offer.description,
    publishDate:   offer.publishDate,
    city:          offer.city,
    previewImage,
    photos,
    isPremium:     offer.isPremium,
    isFavorite:    offer.isFavorite,
    rating:        parseFloat(offer.rating),
    type:          offer.type,
    rooms:         offer.rooms,
    guests:        offer.guests,
    price:         offer.price,
    features:      offer.features,
    commentsCount: offer.commentsCount,
    location: {
      latitude:  offer.latitude,
      longitude: offer.longitude
    },
    author: {
      id:     String(offer.author.id),
      name:   offer.author.username,
      avatar: offer.author.avatar.startsWith('http')
        ? offer.author.avatar
        : `${baseUrl}${offer.author.avatar.startsWith('/') ? '' : '/'}${offer.author.avatar}`
    }
  };
}
