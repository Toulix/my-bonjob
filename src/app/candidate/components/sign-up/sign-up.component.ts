import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConfirmedValidator } from '../../validators/confirmed.validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  //By default the user sees the basic input for registration 
  //(firstname, lastname, email, password, confirmpassword, image)
  basicInscriptionMode: boolean = true;

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
  @ViewChild("fileName", {static: false}) fileName: ElementRef;
  
  profileImageToUpload: File = null;
  candidateProfile: string = null;

  inscriptionForm: FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initInscriptionForm();
  }

  onSubmit() {
    console.log(this.others);
  }

  onSwitchInscriptionMode() {
    this.basicInscriptionMode = !this.basicInscriptionMode;
  }

  initInscriptionForm() {
    this.inscriptionForm = this.fb.group({
      user: this.fb.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['',[Validators.required,
                              Validators.minLength(4)]],
        profile: this.fb.group({
          name: '',
          data: ''
        }),

        experiences: this.fb.array([
          this.addExperienceGroup()
        ]),

        formations: this.fb.array([
          this.addFormationGroup()
        ]),

        others: this.fb.group({
          job_search: '', 
          statut: '',
          mobility: null,
          sector: this.fb.array([])
        })
      },
      { 
        validator: ConfirmedValidator('password', 'confirmPassword')
      })
    })
  }

  get others() {
    return this.inscriptionForm.get('user.others')
  }

  get job_search() {
    return this.inscriptionForm.get('user.others.job_search');
  }

  get user() {
    return this.inscriptionForm.get('user');
  }

  get firstname() {
    return this.inscriptionForm.get('user.firstname');
  }

  get lastname() {
    return this.inscriptionForm.get('user.lastname');
  }

  get email() {
    return this.inscriptionForm.get('user.email');
  }

  get password() {
    return this.inscriptionForm.get('user.password');
  }

  get confirmPassword() {
    return this.inscriptionForm.get('user.confirmPassword')
  }

  get experiencesArray() {
    return this.inscriptionForm.get('user.experiences') as FormArray;
  } 

  get formationArray() {
    return this.inscriptionForm.get('user.formations') as FormArray;
  }

  //get position held per formGroup inside the formArray for validation 
  positionHeld(experienceIndex) {
    return this.experiencesArray.at(experienceIndex).get('positionHeld');
  }

  //get company name per formGroup inside the formArray for validation 
  business(experienceIndex) {
    return this.experiencesArray.at(experienceIndex).get('business');
  }

  level(formationIndex) {
    return this.formationArray.at(formationIndex).get('level');
  }

  addExperienceGroup() {
    return this.fb.group({
            positionHeld: ['', Validators.required], 
            durationPositionHeld: '',
            business:  ['', Validators.required],
            description: ''
          })
       }

  addFormationGroup() {
    return this.fb.group({
      level: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  addExperience() {
    this.experiencesArray.push(this.addExperienceGroup());
  }

  addFormation() {
    this.formationArray.push(this.addFormationGroup());
  }


  deleteExperienceArray(index: number) {
    return this.experiencesArray.removeAt(index);
  }

  setProfileName(profileName: string) {
   return this.inscriptionForm
              .get('user.profile.name')
              .setValue(profileName);
  }

  setProfileData(base64: string) {
    return this.inscriptionForm
          .get('user.profile.data')
          .setValue(base64);
  }

  onClickUploadProfile() {
   this.fileUpload.nativeElement.click();
  }
  
  handleFileInput(file: FileList) {
    this.profileImageToUpload = file.item(0);

    const name = this.profileImageToUpload.name;
    const lastDot =  name.lastIndexOf('.'); 
    const fileName = name.substring(0, lastDot);
    const reader = new FileReader(); 

    reader.onload = (event: any) => {
      //set the src attribute in order for the user to see the 
      this.candidateProfile = event.target.result; // <- base 64 (red by src in the image element)
      //store file name in the form object
      this.setProfileName(fileName);
      //store base 64 in the from object
      this.setProfileData(event.target.result);
      this.fileName.nativeElement.value = this.profileImageToUpload.name;

    }
    reader.readAsDataURL(this.profileImageToUpload);
    
  }
  

}
