import { CityOffer } from './types/offer';

export const getCity = (name: string, cities: CityOffer[]): CityOffer | undefined =>
  cities.find((city) => city.name === name);
import { FullOffer } from './types/offer';
import { SortOffersType, SortType } from './const';

export const sortOffers = (offers: FullOffer[], type: SortType): FullOffer[] => {
  switch (type) {
    case SortOffersType.PriceLowToHigh:
      return [...offers].sort((a, b) => a.price - b.price);
    case SortOffersType.PriceHighToLow:
      return [...offers].sort((a, b) => b.price - a.price);
    case SortOffersType.TopRatedFirst:
      return [...offers].sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
};
