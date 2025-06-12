import { createAction } from '@reduxjs/toolkit';
import { FullOffer } from '../types/offer';
import { SortType } from '../const';

export const changeSortType = createAction<SortType>('main/changeSortType');
export const changeCity = createAction<string>('main/changeCity');
export const fillOffers = createAction<FullOffer[]>('main/fillOffers');
