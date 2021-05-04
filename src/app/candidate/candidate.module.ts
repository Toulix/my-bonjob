import {  ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CandidateComponent } from './components/candidate/candidate.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ExperienceYearComponent } from './components/sign-up/experience-year/experience-year.component';
import { ActualStatusComponent } from './components/sign-up/actual-status/actual-status.component';
import { SectorComponent } from './components/sign-up/sector/sector.component';
import { MobilityComponent } from './components/sign-up/mobility/mobility.component';

let routing = RouterModule.forChild([
  { path: '', component: CandidateComponent },
  { path: 'signup', component: SignUpComponent}
 ]);


@NgModule({
  declarations: [
    CandidateComponent,
    ProfileComponent,
    SignUpComponent,
    ExperienceYearComponent,
    ActualStatusComponent,
    SectorComponent,
    MobilityComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    routing
  ]
})
export class CandidateModule { }
