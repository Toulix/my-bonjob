import { SelectedCandidatesComponent } from './components/selected-candidates/selected-candidates.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { LayoutComponent } from '../shared/components/layout/layout.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { CandidaciesComponent } from './components/candidacies/candidacies.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: CandidaciesComponent },
      { path: 'applications', component: ApplicationsComponent },
      { path: 'selectedCandidates', component: SelectedCandidatesComponent },
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidaciesRoutingModule { }
