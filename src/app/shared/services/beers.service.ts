import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Beer } from '../models/beer.model';
import { State } from '../../shared-store';
import { Store } from '@ngrx/store';
import { successGetBeers } from 'src/app/shared-store/beers/beers.action';
import { tap } from 'rxjs/operators';

export const MOCK_BEERS: Beer[] =
  [
    {
      'id': 192,
      'name': 'Punk IPA 2007 - 2010',
      'tagline': 'Post Modern Classic. Spiky. Tropical. Hoppy.',
      'first_brewed': '04/2007',
      // tslint:disable-next-line:max-line-length
      'description': 'Our flagship beer that kick started the craft beer revolution. This is James and Martin\'s original take on an American IPA, subverted with punchy New Zealand hops. Layered with new world hops to create an all-out riot of grapefruit, pineapple and lychee before a spiky, mouth-puckering bitter finish.',
      'image_url': 'https://images.punkapi.com/v2/192.png',
      'abv': 6.0,
      'ibu': 60.0,
      'target_fg': 1010.0,
      'target_og': 1056.0,
      'ebc': 17.0,
      'srm': 8.5,
      'ph': 4.4,
      'attenuation_level': 82.14,
      'volume': {
        'value': 20,
        'unit': 'liters'
      },
      'boil_volume': {
        'value': 25,
        'unit': 'liters'
      },
      'method': {
        'mash_temp': [
          {
            'temp': {
              'value': 65,
              'unit': 'celsius'
            },
            'duration': 75
          }
        ],
        'fermentation': {
          'temp': {
            'value': 19.0,
            'unit': 'celsius'
          }
        },
        'twist': null
      },
      'ingredients': {
        'malt': [
          {
            'name': 'Extra Pale',
            'amount': {
              'value': 5.3,
              'unit': 'kilograms'
            }
          }
        ],
        'hops': [
          {
            'name': 'Ahtanum',
            'amount': {
              'value': 17.5,
              'unit': 'grams'
             },
             'add': 'start',
             'attribute': 'bitter'
           },
           {
             'name': 'Chinook',
             'amount': {
               'value': 15,
               'unit': 'grams'
             },
             'add': 'start',
             'attribute': 'bitter'
           }
        ],
        'yeast': 'Wyeast 1056 - American Ale™'
      },
      'food_pairing': [
        'Spicy carne asada with a pico de gallo sauce',
        'Shredded chicken tacos with a mango chilli lime salsa',
        'Cheesecake with a passion fruit swirl sauce'
      ],
      // tslint:disable-next-line:max-line-length
      'brewers_tips': 'While it may surprise you, this version of Punk IPA isn\'t dry hopped but still packs a punch! To make the best of the aroma hops make sure they are fully submerged and add them just before knock out for an intense hop hit.',
      'contributed_by': 'Sam Mason <samjbmason>'
    },
    {
      'id': 192,
      'name': 'Punk IPA 2007 - 2010',
      'tagline': 'Post Modern Classic. Spiky. Tropical. Hoppy.',
      'first_brewed': '06/2007',
      // tslint:disable-next-line:max-line-length
      'description': 'Our flagship beer that kick started the craft beer revolution. This is James and Martin\'s original take on an American IPA, subverted with punchy New Zealand hops. Layered with new world hops to create an all-out riot of grapefruit, pineapple and lychee before a spiky, mouth-puckering bitter finish.',
      'image_url': 'https://images.punkapi.com/v2/192.png',
      'abv': 3.0,
      'ibu': 60.0,
      'target_fg': 1010.0,
      'target_og': 1056.0,
      'ebc': 17.0,
      'srm': 8.5,
      'ph': 4.4,
      'attenuation_level': 82.14,
      'volume': {
        'value': 20,
        'unit': 'liters'
      },
      'boil_volume': {
        'value': 25,
        'unit': 'liters'
      },
      'method': {
        'mash_temp': [
          {
            'temp': {
              'value': 65,
              'unit': 'celsius'
            },
            'duration': 75
          }
        ],
        'fermentation': {
          'temp': {
            'value': 19.0,
            'unit': 'celsius'
          }
        },
        'twist': null
      },
      'ingredients': {
        'malt': [
          {
            'name': 'Extra Pale',
            'amount': {
              'value': 5.3,
              'unit': 'kilograms'
            }
          }
        ],
        'hops': [
          {
            'name': 'Ahtanum',
            'amount': {
              'value': 17.5,
              'unit': 'grams'
             },
             'add': 'start',
             'attribute': 'bitter'
           },
           {
             'name': 'Chinook',
             'amount': {
               'value': 15,
               'unit': 'grams'
             },
             'add': 'start',
             'attribute': 'bitter'
           }
        ],
        'yeast': 'Wyeast 1056 - American Ale™'
      },
      'food_pairing': [
        'Spicy carne asada with a pico de gallo sauce',
        'Shredded chicken tacos with a mango chilli lime salsa',
        'Cheesecake with a passion fruit swirl sauce'
      ],
      // tslint:disable-next-line:max-line-length
      'brewers_tips': 'While it may surprise you, this version of Punk IPA isn\'t dry hopped but still packs a punch! To make the best of the aroma hops make sure they are fully submerged and add them just before knock out for an intense hop hit.',
      'contributed_by': 'Sam Mason <samjbmason>'
    }
  ];

  function compare(v1, v2, col) {

    if (col === 'first_brewed') {
      const aa = v1.split('/').reverse().join();
      const bb = v2.split('/').reverse().join();
      return aa < bb ? -1 : (aa > bb ? 1 : 0);
    }

    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  function sort(countries: Beer[], column: string, direction: string): Beer[] {

    if (direction === '') {
      return countries;
    } else {
      return [...countries].sort((a, b) => {
        const res = compare(a[column], b[column], column);
        return direction === 'asc' ? res : -res;
      });
    }
  }

@Injectable({
  providedIn: 'root'
})
export class BeersService {
  public beerList$: Observable<Object>;

  constructor(public store: Store<State>, protected readonly http: HttpClient) { }

  public getBeersList(page = null, search = null) {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page);
    }
    if (search) {
      const str = search.replace(' ', '_');
      params = params.set('beer_name', str);
    }
    return this.beerList$ = this.http
    .get<Beer[]>(`https://api.punkapi.com/v2/beers`,{
      params
    });
  }

  public getBeerList(id: string) {
    return this.beerList$ = this.http
    .get<Beer>(`https://api.punkapi.com/v2/beers/${id}`);
  }

  public getConfigResponse(): Observable<HttpResponse<Object>> {
    return this.http.get<HttpResponse<Object>>(
      `https://api.punkapi.com/v2/beers`, { observe: 'response' }).pipe(
        tap(resp => console.log('header', resp.headers.get('x-ratelimit-remaining')))
   );
  }

  public getMockBeersList() {
   return of(MOCK_BEERS);
  }

  public sortList(beer$: Observable<Beer[]>, column: string, direction: string) {
    let beers: Beer[];
    beer$.subscribe(dat => {
      beers = dat;
    });

    const data = sort(beers, column, direction);
    this.store.dispatch(successGetBeers({ payload: data }));
  }

}
