import { SignUpService } from './../core/services/sign-up.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { CandidatesListComponent } from './components/candidates-list/candidates-list.component';
import { SingleCandidateComponent } from './components/candidates-list/single-candidate/single-candidate.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    CandidatesListComponent,
    SingleCandidateComponent,
    ProfileComponent,
    SignupFormComponent
  ],
  providers: [SignUpService]
})
export class AdminModule { }
