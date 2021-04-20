import { Subscription } from 'rxjs';
import { UtilsService } from '../core/services/utils.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'acces-login',
  templateUrl: './acces-login.component.html',
  styleUrls: ['./acces-login.component.scss']
})
export class AccesLoginComponent implements OnInit, OnDestroy {
  isAdminLink: boolean
  linkStatusSub: Subscription

  constructor(private utils: UtilsService) { }

  ngOnInit(): void {
    this.isAdminLink = this.utils.getIsAdminLinkStatus();
    this.linkStatusSub = this.utils.linkChandedListener()
        .subscribe(
          (linkStatus: boolean)=> {
          this.isAdminLink = linkStatus;
          }
    )

  }

  ngOnDestroy() {
    this.linkStatusSub.unsubscribe();
  }

}
