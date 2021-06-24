import { SearchJobOfferComponent } from './components/search-job-offer/search-job-offer.component';
import { AuthGuard } from './../core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../shared/components/layout/layout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const route: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'profile' },
      { path: 'profile', component: ProfileComponent },
      { path: 'searchOffer', component: SearchJobOfferComponent }
    ]
  },
  { path: 'signup', component: SignUpComponent }
];


@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class CandidateRoutingModule { }
