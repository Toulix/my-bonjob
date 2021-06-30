import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccesLoginComponent } from './acces-login/acces-login.component';

const routes: Routes = [
  {
    path: '', component: AccesLoginComponent, pathMatch: 'full'
  },
  {
    path: "admin",
    loadChildren: () => import("./admin/admin.module")
    .then(m => m.AdminModule),
  },
  {
    path: "candidate",
    loadChildren: () => import("./candidate/candidate.module")
    .then(m => m.CandidateModule),
    
  },
  {
    path: "authentication",
    loadChildren: () => import("./authentication/authentication.module")
    .then(m => m.AuthenticationModule)
  },
  { 
    path: 'candidatelist', 
    loadChildren: () => import('./candidate-list/candidate-list.module')
    .then(m => m.CandidateListModule)
  },
  { 
    path: 'offers',
    loadChildren: () => import('./offers/offers.module')
    .then(m => m.OffersModule) },
  { path: 'candidacies', loadChildren: () => import('./candidacies/candidacies.module').then(m => m.CandidaciesModule) } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
