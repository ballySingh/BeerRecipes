import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './shared-store';
import { getBeers } from './shared-store/beers/beers.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  headerTitle = 'Slido Beer Finder.';

  constructor(public store: Store<State>) {
    this.store.dispatch(getBeers({}));
   }
}
