import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UtilsService } from './core/services/utils.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  isAdminLink: boolean
  linkStatusSub: Subscription;

  constructor(public utils: UtilsService,
              public authService: AuthService,
              public router: Router) {}

  ngOnInit() {
    this.authService.autoLogin();
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

  setClasses() {
    return {   
        candidateBackground: !this.isAdminLink,
        adminBackground: this.isAdminLink,
        defaultBackground: this.router.url.includes('authentication') || 
                            this.router.url.includes('signup')
    }
  }

}
