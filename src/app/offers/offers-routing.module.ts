import { PublishedOffersComponent } from './components/offers/published-offers/published-offers.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { LayoutComponent } from '../shared/components/layout/layout.component';
import { OffersComponent } from './components/offers.component';


const routes: Routes = [
  { path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
      children: [
        { path: '', component: OffersComponent},
        { path: 'publishedOffers', component: PublishedOffersComponent},
      ]
    },
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffersRoutingModule { }
