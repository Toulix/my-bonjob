import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast } from 'bootstrap';
import { Subscription } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';
import { CandidateResponseData } from 'src/app/core/models/candidate-response-data';

import { User } from './../../../core/models/connected.user';
import { Experience } from './../../../core/models/experience';
import { Formation } from './../../../core/models/fomations';
import { Language } from './../../../core/models/language';
import { AuthService } from './../../../core/services/auth.service';
import { CandidateService } from './../../services/candidate.service';
import { ProfilFormService } from './../../services/profil-form.service';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  isLoading = false;
  user: User;

  //needed by video and pjs
  candidate: CandidateResponseData = null;

  userSub: Subscription;

  basicInfoForm: FormGroup;


  @ViewChild("userToast") userToast: ElementRef<HTMLElement>
  toast: Toast;



  constructor(private profilFormService: ProfilFormService,
    private fb: FormBuilder,
    private candidateService: CandidateService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.initBasicInfoForm();
    console.log("Ng on init profil component called");

    this.userSub = this.authService
      .user$
      .pipe( //when refreshing the page (the user behaviorSubject becomes null)
        startWith(this.authService.user),
        tap((user) => {
          console.log('User from tap Operator', user);
        }),
        switchMap(user => {
          console.log("User from switchMap", user);

          this.user = user;
          return this.candidateService
            .getOne<CandidateResponseData>(user?.id);
        })
      ).subscribe(
        //we should patch all the form here
        //using loadash if necessary
        (result: CandidateResponseData) => {
          console.log("Result from candidate service", result);

          this.candidate = result;

          this.patchBasicForm(result);

          // this.basicInfoForm.patchValue(result);
          console.log("Basic Info form after patching... ", this.basicInfoForm.value);

          this.isLoading = false;
        }
      );
  }

  patchBasicForm(result: CandidateResponseData) {
    this.basicInfoForm.patchValue({
      user: {
        ...result.user
      }
    });
    // result.user.experiences ? result.user.experiences : default(initExperience array)
    result.user.experiences ?
      this.patchExperiences(result.user.experiences) :
      this.profilFormService.experiencesArray(this.basicInfoForm)
        .push(this.profilFormService.addExperienceGroup());

    result.user.formations ?
      this.patchFormations(result.user.formations) :
      this.profilFormService.formationsArray(this.basicInfoForm)
        .push(this.profilFormService.addFormationGroup());

    result.user.languages ?
      this.patchLanguage(result.user.languages) :
      this.profilFormService.languagesArray(this.basicInfoForm)
        .push(this.profilFormService.addLanguageGroup());
  }

  patchLanguage(languages: Language[]) {
    let control = this.profilFormService.languagesArray(this.basicInfoForm);
    languages.forEach(language => {
      control.push(this.fb.group({
        name: [language.name, Validators.required],
        level: [language.level]
      }))
    })
  }

  patchFormations(formations: Formation[]) {
    let control = this.profilFormService.formationsArray(this.basicInfoForm);
    formations.forEach(formation => {
      control.push(this.fb.group({
        id: formation.id,
        level: [formation.level, Validators.required],
        description: [formation.description, Validators.required]
      }))
    })

  }
  patchExperiences(experiences: Experience[]) {
    let control = this.profilFormService.experiencesArray(this.basicInfoForm);
    experiences.forEach(exp => {
      control.push(this.fb.group({
        id: exp.id,
        positionHeld: [exp.positionHeld, Validators.required],
        durationPositionHeld: [exp.durationPositionHeld],
        business: [exp.business, Validators.required],
        description: [exp.description]
      }))
    })
  }

  initBasicInfoForm() {
    //we need to chang this
    return this.basicInfoForm = this.profilFormService.toProfilFormGroup();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  ngAfterViewInit() {
    this.toast = new Toast(this.userToast.nativeElement);
  }


  onShowToast() { //output event
    this.toast.show();
  }


}
