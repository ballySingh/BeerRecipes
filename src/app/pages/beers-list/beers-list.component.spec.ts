import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BeersListComponent } from './beers-list.component';
import { BeersService, MOCK_BEERS } from '../../shared/services/beers.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { getPagination, getBeersList } from '../../shared-store/beers/beers.selectors';
import { getBeer, getBeers, setPaginatorNo } from 'src/app/shared-store/beers/beers.action';

describe('BeersListComponent', () => {
  let component: BeersListComponent;
  let fixture: ComponentFixture<BeersListComponent>;
  let store: Store<any>;
  let dispatchSpy;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        NgbModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
      ],
      declarations: [ BeersListComponent ],
      providers: [
        provideMockStore({
          initialState: {
            beers: [],
            beer: null,
            paginatorNo: 1
          },
           selectors: [
            {
              selector: getPagination,
              value: '1'
            },
            {
              selector: getBeersList,
              value: MOCK_BEERS
            }
          ]
        })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeersListComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    store = TestBed.inject(Store);
    dispatchSpy = spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPagination', () => {
    component.paginationChange(1);
    expect(dispatchSpy).toHaveBeenCalledTimes(2);
  });

  it('should call getPagination', () => {
    fixture.detectChanges();
    expect(compiled.querySelectorAll('tbody tr').length).toBe(2);
  });

  it('should have a list of pagination', () => {
    fixture.detectChanges();
    expect(compiled.querySelectorAll('ul li').length).toBeGreaterThan(1);
  });

  it('should have made a serach', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('input');
    el.value = 's';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(dispatchSpy).toHaveBeenCalledTimes(1);
    });

  });


});
