import { LevelAttribute } from './../../../../models/language-level-attribute';
import { Level } from './../../../../enums/language-level';
import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'language-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: LevelComponent,
      multi: true
    }]
})
export class LevelComponent implements OnInit, ControlValueAccessor {
  
  @Input() 
  form: FormGroup


  value: string;
  languageLevel: LevelAttribute[];

  onChange: (value: string) => {}
  onTouched: () => {}

  constructor() { }

  writeValue(obj: string): void {
    console.log("write value -> ", this.value);
    
   this.value = obj
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
   // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.value = this.form.get('level').value;
    this.initLevelAttribute();
    console.log("Form level", this.form.get('level').value);
    console.log("Value",this.value);
  }

  initLevelAttribute() {
    this.languageLevel =  [
              { value: Level.BEGINNER,
                isSelected: (this.value === Level.BEGINNER) ? true: false,
                label: Level.BEGINNER,
                styleClass: 'beginner'},
              { value: Level.INTERMEDIATE,
                isSelected: (this.value === Level.INTERMEDIATE) ? true: false,
                label: Level.INTERMEDIATE, 
                styleClass:'intermediate' },
              { value: Level.ADVANCED,
                isSelected: (this.value === Level.ADVANCED) ? true: false,
                label: Level.ADVANCED,
                styleClass: 'advanced'},
              { value: Level.FLUENT,
                isSelected:  (this.value === Level.FLUENT) ? true: false,
                label: Level.FLUENT,
                styleClass: 'fluent'},
            ]
  }

  selectLevel(level: LevelAttribute) {
    this.onTouched();
    this.languageLevel.filter(l => l != level)
                      .map(l => l.isSelected = false);

    level.isSelected = !level.isSelected;

    const value = this.form.get('level').value;
    if(value == level.value) {
    return this.onChange('');
    }
    return  this.onChange(level.value);
}
 
}
