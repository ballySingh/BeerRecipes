import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeersListComponent } from './pages/beers-list/beers-list.component';
import { BeerDetailComponent } from './pages/beer-detail/beer-detail.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'beers-list' },
  { path: 'beers-list', component: BeersListComponent },
  { path: 'beer-detail/:id', component: BeerDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
