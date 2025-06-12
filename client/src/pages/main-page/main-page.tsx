import React, { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { CitiesCard } from '../../components/cities-card/cities-card';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import CityList from '../../components/city-list/city-list';
import SortOptions from '../../components/sort-options/sort-options';
import { sortOffers } from '../../utils';

export const MainPage: React.FC = () => {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const selectedCity = useAppSelector((state) => state.city);
  const sortType = useAppSelector((state) => state.sortType);
  const offers = useAppSelector((state) => state.offers);

  const filteredOffers = offers.filter((offer) => offer.city.name === selectedCity);
  const sortedOffers = sortOffers(filteredOffers, sortType);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <Logo />
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left" />
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span className="header__user-name user__name">Myemail@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList />
          </section>
        </div>

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {sortedOffers.length} places to stay in {selectedCity}
              </b>

              <SortOptions />

              <div className="cities__places-list places__list tabs__content">
                {sortedOffers.map((offer) => (
                  <div
                    key={offer.id}
                    onMouseEnter={() => setActiveOfferId(offer.id)}
                    onMouseLeave={() => setActiveOfferId(null)}
                  >
                    <CitiesCard
                      id={offer.id}
                      title={offer.title}
                      type={offer.type}
                      price={offer.price}
                      isPremium={offer.isPremium}
                      previewImage={offer.images[0]}
                      rating={offer.rating}
                    />
                  </div>
                ))}
              </div>
            </section>

            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={sortedOffers} activeOfferId={activeOfferId} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
