// src/pages/offer-page/offer-page.tsx
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { FullOffer } from '../../types/offer';
import Logo from '../../components/logo/logo';
import { AppRoute } from '../../const';
import ReviewForm from '../../components/review-form/review-form';

type OfferProps = {
  offers: FullOffer[];
};

export const OfferPage: React.FC<OfferProps> = ({ offers }) => {
  // Получаем id из параметров URL
  const { id } = useParams<{ id: string }>();
  
  // Находим предложение по id
  const offer = offers.find((item) => item.id === id);

  // Если предложение не найдено, перенаправляем на страницу NotFound
  if (!offer) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  const {
    title,
    type,
    price,
    isPremium,
    rating,
    description,
    bedrooms,
    goods,
    host,
    images,
    maxAdults,
  } = offer;

  return (
    <div className="page">
      <header className="header">
        <Logo />
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.map((imgUrl, index) => (
                <div className="offer__image-wrapper" key={index}>
                  <img className="offer__image" src={imgUrl} alt="Offer image" />
                </div>
              ))}
            </div>
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}

              <div className="offer__name-wrapper">
                <h1 className="offer__name">{title}</h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use href="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>

              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${(rating / 5) * 100}%` }}></span>
                  <span className="visually-hidden">{rating}</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>

              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{type}</li>
                <li className="offer__feature offer__feature--bedrooms">{bedrooms} Bedroom{bedrooms > 1 ? 's' : ''}</li>
                <li className="offer__feature offer__feature--adults">Max {maxAdults} adult{maxAdults > 1 ? 's' : ''}</li>
              </ul>

              <div className="offer__price">
                <b className="offer__price-value">€{price}</b>
                <span className="offer__price-text"> / night</span>
              </div>

              <div className="offer__inside">
                <h2 className="offer__inside-title">What's inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((item, index) => (
                    <li key={index} className="offer__inside-item">{item}</li>
                  ))}
                </ul>
              </div>

              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={`offer__avatar-wrapper user__avatar-wrapper${host.isPro ? ' offer__avatar-wrapper--pro' : ''}`}
                  >
                    <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">{host.name}</span>
                  {host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{description}</p>
                </div>
              </div>

              {/* Вставляем форму для отправки комментария */}
              <ReviewForm />
            </div>
          </div>

          <section className="offer__map map">
            {/* Здесь можно отображать карту */}
          </section>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {/* Здесь можно использовать CitiesCard для отображения похожих предложений */}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
