import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../../core/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  defaultUserImage: string = "/assets/images/default_user_image_header_26px.png";
  userImageUrl: string;


  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }


}
