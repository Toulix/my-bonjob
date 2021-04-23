import { Router } from '@angular/router';
import { UtilsService } from '../core/services/utils.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAdminLink: boolean;
  linkStatusSub: Subscription;

  constructor(public utils: UtilsService,
              public route: Router) { }

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

  onClickAdminLink() {
    this.utils.toggleAccessLink();
  }

  onClickCandidateLink() {
    this.utils.toggleAccessLink();
  }

  setAdminLinkStyles() {
    return {
      color: this.route.url.includes('authentication') ||
             this.route.url.includes('signup')
        ? 'var(--primary-color)'
        : 'var(--default-color)'
    }
  }

  setCandidateLinkStyle() {
  return  {
      color: this.route.url.includes('authentication') ||
             this.route.url.includes('signup')
              ? 'var(--secondary-color)'
              : 'var(--default-color)'
    }
  }

}
