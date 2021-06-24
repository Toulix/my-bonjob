import { ProfilFormService } from './services/profil-form.service';
import { UploadService } from './services/upload.service';
import { CandidateService } from './services/candidate.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SignUpService } from '../core/services/sign-up.service';
import { SharedModule } from '../shared/shared.module';
import { CandidateRoutingModule } from './candidate-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { ActualStatusComponent } from './components/sign-up/actual-status/actual-status.component';
import { ExperienceYearComponent } from './components/sign-up/experience-year/experience-year.component';
import { MobilityComponent } from './components/sign-up/mobility/mobility.component';
import { SectorComponent } from './components/sign-up/sector/sector.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AttachementFileService } from './services/attachement-file.service';
import { ExperienceComponent } from './components/profile/experience/experience.component';
import { FormationComponent } from './components/profile/formation/formation.component';
import { LanguageComponent } from './components/profile/language/language.component';
import { OtherInfoComponent } from './components/profile/other-info/other-info.component';
import { DurationComponent } from './components/profile/experience/duration/duration.component';
import { LevelComponent } from './components/profile/language/level/level.component';
import { PhotosGalleryComponent } from './components/profile/other-info/photos-gallery/photos-gallery.component';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { SearchJobOfferComponent } from './components/search-job-offer/search-job-offer.component';

@NgModule({
  declarations: [
    ProfileComponent,
    SignUpComponent,
    ExperienceYearComponent,
    ActualStatusComponent,
    SectorComponent,
    MobilityComponent,
    ExperienceComponent,
    FormationComponent,
    LanguageComponent,
    OtherInfoComponent,
    DurationComponent,
    LevelComponent,
    PhotosGalleryComponent,
    SearchJobOfferComponent,
  ],
  imports: [
    ContentLoaderModule,
    CandidateRoutingModule,
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
    SignUpService,
    CandidateService,
    UploadService,
    AttachementFileService,
    ProfilFormService
  ]
})
export class CandidateModule { }
