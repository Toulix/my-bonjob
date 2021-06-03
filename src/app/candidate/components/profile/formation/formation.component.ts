import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'candidate-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss']
})
export class FormationComponent implements OnInit {
 
  @Input()
  basicInfoForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  get formationArray() {
    return this.basicInfoForm.get('user.formations') as FormArray;
  }


  addFormation() {
    this.formationArray.push(this.addFormationGroup());
  }
  
  deleteFormationArray(index: number) {
    return this.formationArray.removeAt(index);
  }

  addFormationGroup() {
    return this.fb.group({
      id: null,
      level: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  level(formationIndex) {
    return this.formationArray.at(formationIndex).get('level');
  }

}
