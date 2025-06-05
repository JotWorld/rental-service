// src/components/favorite-card-list/favorite-card-list.tsx
import React from 'react';
import { FullOffer } from '../../types/offer';
import { FavoriteCard } from '../favorite-card/favorite-card';

type FavoriteCardListProps = {
  offers: FullOffer[];
};

const FavoriteCardList: React.FC<FavoriteCardListProps> = ({ offers }) => {
  return (
    <div className="favorites__places">
      {offers.map((offer) => (
        <FavoriteCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
};

export { FavoriteCardList };
