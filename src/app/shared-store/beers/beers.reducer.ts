import { Action, createReducer, on } from '@ngrx/store';
import { Beer } from '../../shared/models/beer.model';
import { successGetBeers, successGetBeer, setPaginatorNo } from './beers.action';

export interface Beers {
  beers: Beer[];
  beer: Beer;
  paginatorNo: number;
}

export const initialState: Beers = {
  beers: [],
  beer: null,
  paginatorNo: 1
};

export const questionsReducer = createReducer(
    initialState,
    on(successGetBeers, (state, { payload }) => {
      return { ...state, beers: payload };
    }),
    on(successGetBeer, (state, { payload }) => {
      return { ...state, beer: payload[0] };
    }),
    on(setPaginatorNo, (state, { page }) => {
      return { ...state, paginatorNo: page };
    })
  );

  export function reducer(state: Beers, action: Action) {
    return questionsReducer(state, action);
  }
