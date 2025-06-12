
import { JSX, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppRoute, AuthorizationStatus } from "../../const";
import { MainPage } from "../../pages/main-page/main-page";
import { LoginPage } from "../../pages/login-page/login-page";
import { FavoritesPage } from "../../pages/favorites-page/favorities-page";
import { OfferPage } from "../../pages/offer-page/offer-page";
import { NotFoundPage } from "../../pages/not-found-page/not-found-page";
import { FullOffer } from '../../types/offer';
import PrivateRoute from "../private-route/private-route";
import { useAppDispatch } from "../../hooks";
import { fillOffers } from "../../store/action";
import { offers as mockOffers } from '../../mocks/offers';
type AppMainPageProps = {
  rentalOffersCount: number;
  offers: FullOffer[];
};

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = AuthorizationStatus.NoAuth;

  useEffect(() => {
    dispatch(fillOffers(mockOffers));
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
         <Route path={AppRoute.Main} element={<MainPage />} />

        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />

        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <FavoritesPage offers={mockOffers}/>
            </PrivateRoute>
          }
        />

        <Route
          path={`${AppRoute.Offer}/:id`}
          element={<OfferPage offers={mockOffers} />}
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
