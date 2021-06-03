import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'other-info',
  templateUrl: './other-info.component.html',
  styleUrls: ['./other-info.component.scss']
})
export class OtherInfoComponent implements OnInit {
  @Input()
  basicInfoForm: FormGroup;
  
  constructor() { }

  ngOnInit(): void {
  }

  get others() {
    return this.basicInfoForm.get('user.others');
  }

}
