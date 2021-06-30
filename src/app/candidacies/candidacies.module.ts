import { SelectedCandidatesComponent } from './components/selected-candidates/selected-candidates.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidaciesRoutingModule } from './candidacies-routing.module';
import { CandidaciesComponent } from './components/candidacies/candidacies.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { CandidateListsComponent } from './components/candidate-lists/candidate-lists.component';
import { CandidateListService } from '../candidate-list/services/candidate-list.service';


@NgModule({
  declarations: [
    CandidaciesComponent,
    SelectedCandidatesComponent,
    ApplicationsComponent,
    CandidateListsComponent
  ],
  imports: [
    CommonModule,
    CandidaciesRoutingModule
  ],
  providers: [
    CandidateListService
  ]
})
export class CandidaciesModule { }
