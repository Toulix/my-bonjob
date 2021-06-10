import { Router } from '@angular/router';
import { startWith } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/connected.user';

@Component({
  selector: 'side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent implements OnInit, OnDestroy {
 user: User;
 userSubscription: Subscription;

 isExpanded: boolean = false;

  constructor(public authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user$
                                  .pipe(
                                    startWith(this.authService.user)
                                  )
                                  .subscribe(
                                  user => {
                                    console.log("user in sideNav", user);
                                    
                                    this.user = user;
                                  }
      )
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  setNavBarBackground() {
    return {
      adminBackground: !this.authService.user?.isAdmin,
      candidateBackground: this.authService.user?.isAdmin
        }
  }

  setAreaExpandedClass() {
    // return {
    //   adminBackground: !this.user?.isAdmin && (this.isExpanded == true),
    //   candidateBackground: this.user?.isAdmin && (this.isExpanded == true)
    // }
      return {
      adminBackground: !this.authService.user?.isAdmin && (this.isExpanded == true),
      candidateBackground: this.authService.user?.isAdmin && (this.isExpanded == true)
    }
  }


  logOut() {
    localStorage.removeItem('userData');
    this.authService.emitUser(null);
    // this.router.navigate(['/authentication']);
  }
}
