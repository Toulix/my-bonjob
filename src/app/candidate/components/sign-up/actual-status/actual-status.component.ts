import { Status } from './../../../enums/status';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActualStatusAttribute } from 'src/app/candidate/models/status-attribute';

@Component({
  selector: 'actual-status',
  templateUrl: './actual-status.component.html',
  styleUrls: ['./actual-status.component.scss']
})
export class ActualStatusComponent implements OnInit {

  @Input() form: FormGroup;
  
  allCurrentStatus : ActualStatusAttribute[] = [
    { value: Status.STUDENT, isSelected: false, label: Status.STUDENT, styleClass: 'student-status'},
    { value: Status.LEARNER, isSelected: false,  label: Status.LEARNER, styleClass:'apprentis-status' },
    { value: Status.ACTIVE, isSelected: false, label: Status.ACTIVE, styleClass: 'active-satus'},
    { value: Status.EMPLOYEE, isSelected: false, label: Status.EMPLOYEE, styleClass: 'emploi-status'},
    { value: Status.NOTACTIVE, isSelected: false, label: Status.NOTACTIVE, styleClass: 'not-active-status'},
  ];


  constructor() { }

  ngOnInit(): void {
  }

  selectStatus(selectedStatus: ActualStatusAttribute) {
    const status = selectedStatus.value;
    this.allCurrentStatus.filter(s => s != selectedStatus)
                         .map(s => s.isSelected = false);
    selectedStatus.isSelected = !selectedStatus.isSelected;
//first, check to see if the value is already in the form (the "Ohters" formGroup)
//, if so, just set it to an empty string, that way when we deselect the button 
// the value resumes to an empty string.
    const value = this.form.get('statut').value;
    if(value == selectedStatus.value) {
    return this.form.get('statut').setValue('');
    }
    return  this.form.get('statut').setValue(status);
  }

}
