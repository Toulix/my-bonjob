import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ExperienceLabel } from '../../../constants/year-of-experience';
import { YearOfExperience } from './../../../enums/year-of-experience';
import { ExperienceAttribute } from './../../../models/experience-attribute';

@Component({
  selector: 'experience-year',
  templateUrl: './experience-year.component.html',
  styleUrls: ['./experience-year.component.scss']
})
export class ExperienceYearComponent implements OnInit {

  @Input() form: FormGroup;
  
  experiencesYear : ExperienceAttribute[] = [
    { value: YearOfExperience.NO, isSelected: true, label: ExperienceLabel.NO, styleClass: 'no-year'},
    { value: YearOfExperience.PLUS_ONE, isSelected: false,  label: ExperienceLabel.PLUS_ONE, styleClass:'year-one' },
    { value: YearOfExperience.ONE_TO_TWO, isSelected: false, label: ExperienceLabel.ONE_TO_TWO, styleClass: 'year-1-2'},
    { value: YearOfExperience.THREE_TO_FOUR, isSelected: false, label: ExperienceLabel.THREE_TO_FOUR, styleClass: 'year-3-4'},
    { value: YearOfExperience.PLUS_FIVE, isSelected: false, label: ExperienceLabel.PLUS_FIVE, styleClass: 'year-5'},
  ]
  constructor() { }

  ngOnInit(): void {
  }

  selectExperience(experience: ExperienceAttribute) {
      const duration = experience.value;
      this.experiencesYear.filter(exp => exp != experience)
                          .map(exp => exp.isSelected = false);
      experience.isSelected = !experience.isSelected;

      const value = this.form.get('durationPositionHeld').value;
      if(value == experience.value) {
        return this.form.get('durationPositionHeld').setValue('');
      }
        return this.form.get('durationPositionHeld').setValue(duration);
  }
}
