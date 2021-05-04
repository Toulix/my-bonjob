import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Mobility } from 'src/app/candidate/enums/mobility';

@Component({
  selector: 'mobility',
  templateUrl: './mobility.component.html',
  styleUrls: ['./mobility.component.scss']
})
export class MobilityComponent implements OnInit {

  @Input() form: FormGroup;

  mobilities = [
    { label: Mobility.YES , value: true},
    { label: Mobility.NO , value: false},
  ];

  constructor() { }

  ngOnInit(): void {
    
  }

}
