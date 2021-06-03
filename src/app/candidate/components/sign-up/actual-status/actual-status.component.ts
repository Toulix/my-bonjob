import { Status } from './../../../enums/status';
import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActualStatusAttribute } from 'src/app/candidate/models/status-attribute';

@Component({
  selector: 'actual-status',
  templateUrl: './actual-status.component.html',
  styleUrls: ['./actual-status.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: ActualStatusComponent,
    multi: true
  }]
})
export class ActualStatusComponent implements OnInit, ControlValueAccessor{

  value: string;

  @Input() form: FormGroup;

  onChange: (value: string) => {}
  onTouched: () => {}
  
  allCurrentStatus : ActualStatusAttribute[] 


  constructor() { }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
   this.onTouched = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.value = this.form.get('statut').value;
    console.log("Actual status value", this.value);
    console.log("Actual status form", this.form.value);
    
    this.initAllStatus();
  }

  initAllStatus() {
    this.allCurrentStatus = [
      { value: Status.STUDENT, 
        isSelected: (this.value === Status.STUDENT) ? true: false,
        label: Status.STUDENT,
        styleClass: 'student-status'},
      { value: Status.LEARNER,
        isSelected: (this.value === Status.LEARNER) ? true: false,
        label: Status.LEARNER,
        styleClass:'apprentis-status' },
      { value: Status.ACTIVE,
        isSelected: (this.value === Status.ACTIVE) ? true: false,
        label: Status.ACTIVE,
        styleClass: 'active-satus'},
      { value: Status.EMPLOYEE,
        isSelected: (this.value === Status.EMPLOYEE) ? true: false,
        label: Status.EMPLOYEE,
        styleClass: 'emploi-status'},
      { value: Status.NOTACTIVE,
        isSelected: (this.value === Status.NOTACTIVE) ? true: false,
        label: Status.NOTACTIVE,
        styleClass: 'not-active-status'},
    ];
  }

  selectStatus(selectedStatus: ActualStatusAttribute) {
    // const status = selectedStatus.value;
    
    this.onTouched();

    this.allCurrentStatus.filter(s => s != selectedStatus)
                         .map(s => s.isSelected = false);
    selectedStatus.isSelected = !selectedStatus.isSelected;
//first, check to see if the value is already in the form (the "Ohters" formGroup)
//, if so, just set it to an empty string, that way when we deselect the button 
// the value resumes to an empty string.
    const value = this.form.get('statut').value;
    if(value == selectedStatus.value) {
    return this.onChange('');
    }
    return  this.onChange(selectedStatus.value);
  }

}
