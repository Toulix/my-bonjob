import { PjsComponent } from './components/profile/user-pjs/pjs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';
import { UserProfileImageComponent } from './components/profile/user-image/user-profile-image.component';
import { UserProfileBasicInfoComponent } from './components/profile/user-basic-info/user-profile-basic-info.component';
import { UploadService } from '../candidate/services/upload.service';
import { AttachementFileService } from '../candidate/services/attachement-file.service';
import { UserVideoComponent } from './components/profile/user-video/user-video.component';
import { ContentLoaderComponent, ContentLoaderModule } from '@ngneat/content-loader';
import { SideNavBarComponent } from './components/side-nav-bar/side-nav-bar.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    ToolbarComponent,
    LayoutComponent,
    UserProfileImageComponent,
    UserProfileBasicInfoComponent,
    SideNavBarComponent,
    PjsComponent,
    UserVideoComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
 
  ],
  exports: [
    LayoutComponent,
    SpinnerComponent,
    UserProfileImageComponent,
    UserProfileBasicInfoComponent
  ],
  providers: [
    UploadService,
    AttachementFileService,
  ]

})
export class SharedModule { }
