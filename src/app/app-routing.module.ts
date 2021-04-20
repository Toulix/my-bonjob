import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccesLoginComponent } from './acces-login/acces-login.component';

const routes: Routes = [
  {
    path: '', component: AccesLoginComponent
  },
  {
    path: "admin",
    loadChildren: () => import("./admin/admin.module")
    .then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  {
    path: "candidate",
    loadChildren: () => import("./candidate/candidate.module")
    .then(m => m.CandidateModule),
    canActivate: [AuthGuard]
  },
  {
    path: "authentication",
    loadChildren: () => import("./authentication/authentication.module")
    .then(m => m.AuthenticationModule)
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
