import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Beers } from './beers.reducer';

export const getBeersStateState = createFeatureSelector<Beers>('beersList');

export const getBeersList = createSelector(
    getBeersStateState,
    state => state.beers
);

export const getBeerDetail = createSelector(
    getBeersStateState,
    state => state.beer
);

export const getPagination = createSelector(
    getBeersStateState,
    state => state.paginatorNo
);
