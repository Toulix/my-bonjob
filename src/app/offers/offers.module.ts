import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersRoutingModule } from './offers-routing.module';
import { OffersComponent } from './components/offers.component';
import { PublishedOffersComponent } from './components/offers/published-offers/published-offers.component';


@NgModule({
  declarations: [
    OffersComponent,
    PublishedOffersComponent,
  ],
  imports: [
    CommonModule,
    OffersRoutingModule,
    SharedModule
  ]
})
export class OffersModule { }
