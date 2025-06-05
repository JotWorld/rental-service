// src/pages/favorites-page/favorites-page.tsx
import React from 'react';
import { FullOffer } from '../../types/offer';
import { FavoriteCardList } from '../../components/favorite-card-list/favorite-card-list';

type FavoritesPageProps = {
  offers: FullOffer[];
};

const FavoritesPage: React.FC<FavoritesPageProps> = ({ offers }) => {
  // Фильтруем предложения, которые находятся в избранном
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  return (
    <div className="page">
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoriteCardList offers={favoriteOffers} />
          </section>
        </div>
      </main>
    </div>
  );
};

export { FavoritesPage };
