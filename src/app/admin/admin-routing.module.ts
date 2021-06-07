import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../shared/components/layout/layout.component';
import { AuthGuard } from './../core/guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';


  
const route: Routes = [
    { path: '',
      component: LayoutComponent,
      canActivate: [AuthGuard],
        children: [
          { path: '', redirectTo: 'profile'}, 
          { path: 'profile', component: ProfileComponent },
        ]
      },
    { path: 'signup', component: SignupFormComponent}
   ];
  

@NgModule({
    imports: [RouterModule.forChild(route)],
    exports: [RouterModule]
})
export class AdminRoutingModule{}
