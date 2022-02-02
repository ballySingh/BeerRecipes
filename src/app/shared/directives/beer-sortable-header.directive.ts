import { Directive, EventEmitter, Input, Output } from '@angular/core';

export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  selector: 'th[appBeerSortableHeader]',
   // tslint:disable-next-line:no-host-metadata-property
   host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class BeerSortableHeaderDirective {

  constructor() { }

  @Input() appBeerSortableHeader: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    console.log('BeerSortableHeaderDirective')
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.appBeerSortableHeader, direction: this.direction});
  }

}
