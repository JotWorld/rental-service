// src/pages/not-found-page/not-found-page.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';


const NotFoundPage: React.FC = () => (
  <div className="page">
    <header className="header">

    </header>
    <main className="page__main page__main--not-found">
      <div className="not-found">
        <h1 className="not-found__status">404</h1>
        <p className="not-found__message">Page not found</p>
        <Link className="not-found__link" to={AppRoute.Main}>
          Go to main page
        </Link>
      </div>
    </main>
  </div>
);

export { NotFoundPage };
