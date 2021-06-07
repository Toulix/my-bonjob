import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'go-back-arrow',
  templateUrl: './go-back-arrow.component.html',
  styleUrls: ['./go-back-arrow.component.scss']
})
export class GoBackArrowComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
    
  }

  goBack() {
    this.location.back();
  }

}
