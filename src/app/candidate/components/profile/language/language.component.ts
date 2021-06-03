import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'candidate-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  @Input()
  basicInfoForm: FormGroup;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log("Fomr in language component ", this.basicInfoForm.value);
    
  }

  get languagesArray() {
    return this.basicInfoForm.get('user.languages') as FormArray;
  }

  addLanguage() {
    this.languagesArray.push(this.addFormationGroup());
  }
  
  deleteLanguageArray(index: number) {
    return this.languagesArray.removeAt(index);
  }

  addFormationGroup() {
    return this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required]
    })
  }

  name(formationIndex) {
    return this.languagesArray.at(formationIndex).get('name');
  }

}
