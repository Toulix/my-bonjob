import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatesListComponent } from './components/candidates-list/candidates-list.component';
import { SingleCandidateComponent } from './components/candidates-list/single-candidate/single-candidate.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

let routing = RouterModule.forChild([
  { path: '', component: AdminComponent },
  { path: 'signup', component: SignupFormComponent}
 ]);



@NgModule({
  declarations: [
    CandidatesListComponent,
    SingleCandidateComponent,
    ProfileComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    routing
  ]
})
export class AdminModule { }
