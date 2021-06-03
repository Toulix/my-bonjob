import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Mobility } from 'src/app/candidate/enums/mobility';

@Component({
  selector: 'mobility',
  templateUrl: './mobility.component.html',
  styleUrls: ['./mobility.component.scss'],
})
export class MobilityComponent implements OnInit {

  @Input() form: FormGroup;

  mobilities :any;

  constructor() { }

  ngOnInit(): void {
    
    this.initMobilities()
  }
  
  initMobilities() {
    this.mobilities = [
      { label: Mobility.YES , value: true},
      { label: Mobility.NO , value: false},
    ];
  }
}
