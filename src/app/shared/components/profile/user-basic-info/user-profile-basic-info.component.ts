import { AuthService } from './../../../../core/services/auth.service';
import {
  Component, ElementRef, EventEmitter,
  Input, OnInit, Output, ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CandidateResponseData } from 'src/app/core/models/candidate-response-data';
import { User } from 'src/app/core/models/connected.user';

import { CandidateProfileService } from '../../../../candidate/services/candidate-profile.service';
import { UserProfileImageComponent } from '../user-image/user-profile-image.component';
import { UserVideoComponent } from '../user-video/user-video.component';
import { Toast } from 'bootstrap';


@Component({
  selector: 'user-profile-basic-info',
  templateUrl: './user-profile-basic-info.component.html',
  styleUrls: ['./user-profile-basic-info.component.scss']
})
export class UserProfileBasicInfoComponent implements OnInit {

  @Input()
  basicInfoForm: FormGroup;

  @Input()
  user?: User;

  @Input()
  candidate: CandidateResponseData;

  @Output()
  showToastNotification = new EventEmitter();

  isLoading: boolean = false;

  videoForm: FormGroup;

  @ViewChild(UserProfileImageComponent)
  userProfileComponent: UserProfileImageComponent;

  @ViewChild(UserVideoComponent)
  userVideoComponent: UserVideoComponent;


  constructor(private candidateProfileService: CandidateProfileService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onSaveUser() {
    this.isLoading = true;
    console.log("Value to be uploaded ", this.basicInfoForm.value);

    const { email, galeries, pjs, profil, video, ...candidateProfilForm } = this.basicInfoForm.value.user;

    const candidateInfo = Object.assign({}, { user: { ...candidateProfilForm } });

    console.log("All value striped out ", candidateInfo);

    //needs something more generic, like userProfileService (refactoring)
    this.candidateProfileService.update(this.user.id, candidateInfo)
      .subscribe(
        () => {
          console.log("Successful update!");
          //update the user
          this.isLoading = false;
          this.showToastNotification.emit();
        },
        (error) => {
          this.isLoading = false;
          console.log(error);
        }
      )

  }

  onClickUploadProfile() {
    //call the method in the child component, for that we need viewchild
    this.userProfileComponent.onClickUploadProfile();
  }

  onClickUploadVideo() {
    //call the method in the child component, for that we need viewchild
    this.userVideoComponent.onClickUploadVideo();
  }

  onSaveCandidate() {
    this.isLoading = true;
    console.log("Value to be uploaded ", this.basicInfoForm.value);

    const { email, galeries, pjs, profil, video, ...candidateProfilForm } = this.basicInfoForm.value.user;

    const candidateInfo = Object.assign({}, { user: { ...candidateProfilForm } });

    console.log("All value striped out ", candidateInfo);


    this.candidateProfileService.update(this.user.id, candidateInfo)
      .subscribe(
        () => {
          console.log("Successful update!");
          //update the user
          this.isLoading = false;


        },
        (error) => {
          this.isLoading = false;
          console.log(error);
        }
      )

  }

}
