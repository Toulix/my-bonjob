import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CandidateComponent } from './components/candidate/candidate.component';
import { ProfileComponent } from './components/profile/profile.component';

let routing = RouterModule.forChild([
  { path: '', component: CandidateComponent },
  { path: 'signup', component: SignUpComponent }
 ]);


@NgModule({
  declarations: [
    CandidateComponent,
    ProfileComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    routing
  ]
})
export class CandidateModule { }
