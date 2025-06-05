// src/components/cities-card-list/cities-card-list.tsx
import React from 'react';
import { FullOffer } from '../../types/offer';
import { CitiesCard } from '../cities-card/cities-card';

type CitiesCardListProps = {
  offers: FullOffer[];
};

const CitiesCardList: React.FC<CitiesCardListProps> = ({ offers }) => {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <CitiesCard
          key={offer.id}
          id={offer.id}
          title={offer.title}
          type={offer.type}
          price={offer.price}
          isPremium={offer.isPremium}
          previewImage={offer.images[0]} // assuming the first image is the preview
          rating={offer.rating}
        />
      ))}
    </div>
  );
};

export default CitiesCardList;
