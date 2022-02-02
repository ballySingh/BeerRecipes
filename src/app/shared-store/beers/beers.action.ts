import { createAction, props } from '@ngrx/store';
import { Beer } from 'src/app/shared/models/beer.model';

export const getBeers = createAction('[Beers] Get Beers ', props<{page?: number, search?: string}>());

export const getBeer = createAction('[Beers] Get Beer ', props<{id: string}>());

export const successGetBeers = createAction('[Beers] Set Beers', props<{ payload: Beer[] }>());

export const successGetBeer = createAction('[Beers] Set Beer', props<{ payload: Beer }>());

export const setPaginatorNo = createAction('[Beers] Set Pagination number', props<{ page: number }>());

export const ErrorToDoAction = createAction('[Beers] - Beers Error', props<Error>());
