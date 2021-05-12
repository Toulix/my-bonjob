import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LayoutComponent } from '../shared/components/layout/layout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const route: Routes = [
    { path: '',
       component: LayoutComponent,
        children: [
          { path: '', redirectTo: 'profile'}, 
          { path: 'profile', component: ProfileComponent }
        ]
      },
    { path: 'signup', component: SignUpComponent}
   ];
  

@NgModule({
    imports: [RouterModule.forChild(route)],
    exports: [RouterModule]
})
export class CandidateRoutingModule{}