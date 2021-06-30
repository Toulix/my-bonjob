import { SharedModule } from './../shared/shared.module';
import { CandidateListService } from './services/candidate-list.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateListRoutingModule } from './candidate-list-routing.module';
import { CandidateOverviewComponent } from './components/candidate-overview/candidate-overview.component';
import { CandidateListComponent } from './components/candidate-overview/candidate-list/candidate-list.component';
import { CandidateSearchComponent } from './components/candidate-overview/candidate-search/candidate-search.component';
import { SingleCandidateComponent } from './components/candidate-overview/candidate-list/single-candidate/single-candidate.component';
import { GoBackArrowComponent } from './components/candidate-overview/go-back-arrow/go-back-arrow.component';
import { CandidateDetailsComponent } from './components/candidate-overview/candidate-list/single-candidate/candidate-details/candidate-details.component';


@NgModule({
  declarations: [
    CandidateSearchComponent,
    SingleCandidateComponent,
    CandidateListComponent,
    CandidateOverviewComponent,
    CandidateListComponent,
    GoBackArrowComponent,
    CandidateDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CandidateListRoutingModule,
    SharedModule
  ],
  providers: [
    CandidateListService
  ]
})
export class CandidateListModule { }
