
import { JSX } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppRoute, AuthorizationStatus } from "../../const";
import { MainPage } from "../../pages/main-page/main-page";
import { LoginPage } from "../../pages/login-page/login-page";
import { FavoritesPage } from "../../pages/favorites-page/favorities-page";
import { OfferPage } from "../../pages/offer-page/offer-page";
import { NotFoundPage } from "../../pages/not-found-page/not-found-page";
import { FullOffer } from '../../types/offer';
import PrivateRoute from "../private-route/private-route";

type AppMainPageProps = {
  rentalOffersCount: number;
  offers: FullOffer[];
};

function App({ rentalOffersCount, offers }: AppMainPageProps): JSX.Element {
  const authorizationStatus = AuthorizationStatus.NoAuth;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage rentalOffersCount={rentalOffersCount} offers={offers} />}
        />

        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />

        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <FavoritesPage offers={offers}/>
            </PrivateRoute>
          }
        />

        <Route
          path={`${AppRoute.Offer}/:id`}
          element={<OfferPage offers={offers} />}
        />

        <Route
          path={AppRoute.NotFound}
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export { App };
