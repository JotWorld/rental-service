import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/app/app';
import { Setting } from './const';
import { offers } from './mocks/offers';
const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <App rentalOffersCount={Setting.rentalOffersCount}
        offers={offers}/>
    </StrictMode>
  );
}
