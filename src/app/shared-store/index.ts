import {
    ActionReducerMap,
    MetaReducer
  } from '@ngrx/store';

  import * as fromBeers from './beers/beers.reducer';
  import { environment } from '../../environments/environment';
  
  export interface State {
    beersList: fromBeers.Beers;
  }
  
  export const reducers: ActionReducerMap<State> = {
    beersList: fromBeers.reducer
  };
  
  
  export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];