import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as BeersAction from './beers.action';
import { BeersService } from '../../shared/services/beers.service';
import { Beer } from '../../shared/models/beer.model';



@Injectable()
export class BeersEffects {

    getBeers$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(BeersAction.getBeers),
      mergeMap(action =>
        this.beersService.getBeersList(action.page, action.search).pipe(
          map((data: Beer[]) => {
            return BeersAction.successGetBeers({ payload: data });
          }),
          catchError((error: Error) => {
            return of(BeersAction.ErrorToDoAction(error));
          })
        )
      )
    )
  );

    getBeer$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(BeersAction.getBeer),
      mergeMap(action =>
        this.beersService.getBeerList(action.id).pipe(
          map((data: Beer) => {
            return BeersAction.successGetBeer({ payload: data });
          }),
          catchError((error: Error) => {
            return of(BeersAction.ErrorToDoAction(error));
          })
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly beersService: BeersService
  ) {}
}
