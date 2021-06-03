import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

import { ProfilFormService } from './../../../services/profil-form.service';

@Component({
  selector: 'candidate-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  @Input()
  basicInfoForm: FormGroup;

  constructor(private profilFormService: ProfilFormService) { }

  ngOnInit(): void {
    console.log("Experience ", this.basicInfoForm);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  }

  get user() {
    return this.basicInfoForm.get('user');
  }

  get experiencesArray() {
    return this.basicInfoForm.get('user.experiences') as FormArray;
  } 

addExperience() {
    this.experiencesArray
        .push(this.profilFormService.addExperienceGroup());
}

deleteExperienceArray(index: number) {
      return this.experiencesArray.removeAt(index);
}
    //get position held per formGroup inside the formArray for validation 
positionHeld(experienceIndex) {
      return this.experiencesArray.at(experienceIndex).get('positionHeld');
}
    //get company name per formGroup inside the formArray for validation 
  //businessName
business(experienceIndex) {
      return this.experiencesArray.at(experienceIndex).get('business');
}
  
}
