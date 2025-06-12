import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillOffers, changeSortType } from './action';
import { FullOffer } from '../types/offer';
import { SortType, SortOffersType } from '../const';

type State = {
  city: string;
  offers: FullOffer[];
  sortType: SortType;
};

const initialState: State = {
  city: 'Paris',
  offers: [],
  sortType: SortOffersType.Popular,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    });
});
