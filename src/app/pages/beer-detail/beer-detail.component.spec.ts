import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {Location} from '@angular/common';
import { BeerDetailComponent } from './beer-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { getBeerDetail } from '../../shared-store/beers/beers.selectors';

describe('BeerDetailComponent', () => {
  let component: BeerDetailComponent;
  let fixture: ComponentFixture<BeerDetailComponent>;
  let location: Location;
  let store: Store<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgbModule,
        StoreModule.forRoot({}),
      ],
      declarations: [ BeerDetailComponent ],
      providers: [
        provideMockStore({
          initialState: {
            beers: [],
            beer: null,
            paginatorNo: 1
          },
          selectors: [
            {
              selector: getBeerDetail,
              value: ''
            }
          ]
        })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerDetailComponent);
    location = TestBed.get(Location);
    store = TestBed.get(Store);
    spyOn(store, 'select');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call go back', () => {
    spyOn(location, 'back');
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  });

  it('should call selector', () => {
    component.ngOnInit();
    expect(store.select).toHaveBeenCalledWith(
      getBeerDetail
    );
  });
});
