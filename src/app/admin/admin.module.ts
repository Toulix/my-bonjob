import { SignUpService } from './../core/services/sign-up.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './components/admin/admin.component';
import { CandidatesListComponent } from './components/candidates-list/candidates-list.component';
import { SingleCandidateComponent } from './components/candidates-list/single-candidate/single-candidate.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { SharedModule } from '../shared/shared.module';

let routing = RouterModule.forChild([
  { path: '', component: AdminComponent },
  { path: 'signup', component: SignupFormComponent}
 ]);

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    routing,
  ],
  declarations: [
    CandidatesListComponent,
    SingleCandidateComponent,
    ProfileComponent,
    AdminComponent,
    SignupFormComponent
  ],
  providers: [SignUpService]
})
export class AdminModule { }
