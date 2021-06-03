import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ExperienceLabel } from 'src/app/candidate/constants/year-of-experience';
import { ExperienceAttribute } from 'src/app/candidate/models/experience-attribute';

import { YearOfExperience } from './../../../../enums/year-of-experience';

@Component({
  selector: 'duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.scss']
})
export class DurationComponent implements OnInit {
  private _form = new BehaviorSubject<FormGroup>(null);

    @Input() 
    set form(value: FormGroup) {
      this._form.next(value)
    }

    get form() {
      return this._form.getValue();
    }
  
  experiencesYear : ExperienceAttribute[];

  constructor() { }


  ngOnInit(): void {
    //don't forget to unsubscribe 
    this.initExperienceAttribute();
    this._form.subscribe(formGroup => {
      let yearOfExperience = (this.form.controls['durationPositionHeld'].value as number).toString();
      switch (yearOfExperience) {
        case YearOfExperience.NO:
          console.log("enum YearOfExperience: ", YearOfExperience.NO );
          this.experiencesYear.filter(experience => experience.value === YearOfExperience.NO)
                              .map(experience => experience.isSelected = true);
          break;
       
        case YearOfExperience.PLUS_ONE:
          this.experiencesYear.filter(experience => experience.value === YearOfExperience.PLUS_ONE)
                              .map(experience => experience.isSelected = true);
            break;
        
        case YearOfExperience.ONE_TO_TWO:
              this.experiencesYear.filter(experience => experience.value === YearOfExperience.ONE_TO_TWO)
                                  .map(experience => experience.isSelected = true);
            break;

        case YearOfExperience.THREE_TO_FOUR:
              this.experiencesYear.filter(experience => experience.value === YearOfExperience.THREE_TO_FOUR)
                                  .map(experience => experience.isSelected = true);
            break;
        
        case YearOfExperience.PLUS_FIVE:
              this.experiencesYear.filter(experience => experience.value === YearOfExperience.PLUS_FIVE)
                                  .map(experience => experience.isSelected = true);
            break;
         }
    })  
    
  }

  initExperienceAttribute() {
    this.experiencesYear =  [
              { value: YearOfExperience.NO, isSelected: false, label: ExperienceLabel.NO, styleClass: 'no-year'},
              { value: YearOfExperience.PLUS_ONE, isSelected: false,  label: ExperienceLabel.PLUS_ONE, styleClass:'year-one' },
              { value: YearOfExperience.ONE_TO_TWO, isSelected: false, label: ExperienceLabel.ONE_TO_TWO, styleClass: 'year-1-2'},
              { value: YearOfExperience.THREE_TO_FOUR, isSelected: false, label: ExperienceLabel.THREE_TO_FOUR, styleClass: 'year-3-4'},
              { value: YearOfExperience.PLUS_FIVE, isSelected: false, label: ExperienceLabel.PLUS_FIVE, styleClass: 'year-5'},
            ]
  }
 


  selectExperience(experience: ExperienceAttribute) {
    const duration = experience.value;
    this.experiencesYear.filter(exp => exp != experience)
                        .map(exp => exp.isSelected = false);
    experience.isSelected = !experience.isSelected;

    const value = this.form.get('durationPositionHeld').value;
    if(value == experience.value) {
      return this.form.get('durationPositionHeld').setValue(null);
    }
      return this.form.get('durationPositionHeld').setValue(duration);
}

}
