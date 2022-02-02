import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BeersListComponent } from './pages/beers-list/beers-list.component';
import { BeerDetailComponent } from './pages/beer-detail/beer-detail.component';
import { BeersEffects } from './shared-store/beers/beers.effects';
import { reducers, metaReducers } from './shared-store';
import { BeersService } from './shared/services/beers.service';
import { HttpClientModule } from '@angular/common/http';
import { BeerSortableHeaderDirective } from './shared/directives/beer-sortable-header.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const STORE_EFFECTS = [BeersEffects];
@NgModule({
  declarations: [
    AppComponent,
    BeersListComponent,
    BeerDetailComponent,
    BeerSortableHeaderDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    }),
    EffectsModule.forRoot([...STORE_EFFECTS])
  ],
  providers: [BeersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
