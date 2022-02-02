import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {Location} from '@angular/common';
import { State } from '../../shared-store';

import { Observable } from 'rxjs';
import { Beer } from '../../shared/models/beer.model';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { getBeer } from 'src/app/shared-store/beers/beers.action';
import { getBeerDetail } from 'src/app/shared-store/beers/beers.selectors';

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.scss']
})
export class BeerDetailComponent implements OnInit {
  public beer$: Observable<Beer>;


  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private location: Location) {
    this.beer$ = this.store.select(getBeerDetail);
   }

  ngOnInit() {
    this.beer$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        this.store.dispatch(getBeer({ id }));
         return this.store.select(getBeerDetail);
      }
      )
    );
  }

  goBack(): void {
    this.location.back();
  }


}
