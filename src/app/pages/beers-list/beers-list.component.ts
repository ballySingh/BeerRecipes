import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../shared-store';
import { getBeersList, getPagination } from '../../shared-store/beers/beers.selectors';
import { Observable } from 'rxjs';
import { Beer } from '../../shared/models/beer.model';
import { BeerSortableHeaderDirective, SortEvent } from '../../shared/directives/beer-sortable-header.directive';
import { BeersService } from '../../shared/services/beers.service';
import { getBeers, setPaginatorNo } from '../../shared-store/beers/beers.action';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-beers-list',
  templateUrl: './beers-list.component.html',
  styleUrls: ['./beers-list.component.scss']
})
export class BeersListComponent implements OnInit {

  public beers$: Observable<Beer[]>;
  public page: number;
  @ViewChildren(BeerSortableHeaderDirective) headers: QueryList<BeerSortableHeaderDirective>;
  public head: string[];

  filter = new FormControl('');

  constructor(
    private store: Store<State>,
    private beersService: BeersService) {
    this.beers$ = this.store.select(getBeersList);
    this.store.select(getPagination).subscribe(page => {
      this.page = page;
    });
   }

  ngOnInit() {
    this.filter.valueChanges.subscribe((search) => {
      this.store.dispatch(getBeers({search}));
    });
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.appBeerSortableHeader !== column) {
        header.direction = '';
      }
    });

    this.beersService.sortList(this.beers$, column, direction);

  }

  paginationChange(page: number): void {
    this.store.dispatch(getBeers({page}));
    this.store.dispatch(setPaginatorNo({page}));
  }

}
