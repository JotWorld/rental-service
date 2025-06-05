// src/components/favorite-card/favorite-card.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { FullOffer } from '../../types/offer';

type FavoriteCardProps = {
  offer: FullOffer;
};

const FavoriteCard: React.FC<FavoriteCardProps> = ({ offer }) => {
  return (
    <article className="favorites__card place-card">
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={AppRoute.Offer.replace(':id', offer.id)}>
          <img
            className="place-card__image"
            src={offer.images[0]}
            width="150"
            height="110"
            alt={offer.title}
          />
        </Link>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use href="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${(offer.rating / 5) * 100}%` }}></span>
            <span className="visually-hidden">{offer.rating}</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={AppRoute.Offer.replace(':id', offer.id)}>{offer.title}</Link>
        </h2>

        <p className="place-card__type">{offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}</p>
      </div>
    </article>
  );
};

export { FavoriteCard };
