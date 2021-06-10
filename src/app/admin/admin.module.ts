import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { SignUpService } from './../core/services/sign-up.service';
import { AdminRoutingModule } from './admin-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { PublishOfferComponent } from './components/publish-offer/publish-offer.component';



@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    ProfileComponent,
    SignupFormComponent,
    PublishOfferComponent,
  ],
  providers: [SignUpService]
})
export class AdminModule { }
