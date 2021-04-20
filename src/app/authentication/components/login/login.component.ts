import { UtilsService } from '../../../core/services/utils.service';
import { AuthService } from '../../../core/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/connected.user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isAdminLink: boolean
  error: string = null;
  isLoading: boolean = false;
  loginFormGroup: FormGroup;
  
  linkStatusSub: Subscription;
  userSub: Subscription;

  user: User;

  constructor(private auth: AuthService,
              private utils: UtilsService,
              private router: Router, 
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userSub = this.auth.userSubject
                      .subscribe(user => {
                          this.user = user
                        })
                        
    this.initLoginForm();
    this.isAdminLink = this.utils.getIsAdminLinkStatus();
    this.linkStatusSub = this.utils.linkChandedListener()
                                      .subscribe(
                                        (linkStatus: boolean)=> {
                                        this.isAdminLink = linkStatus;
                                        })
        }

  ngOnDestroy() {
    this.linkStatusSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  initLoginForm() {
    this.loginFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
     })
  }

  get email() {
    return this.loginFormGroup.get('email');
  }

  get password() {
    return this.loginFormGroup.get('password');
  }


  login() {
    this.isLoading = true;

    this.auth.singIn(this.loginFormGroup.value)
              .subscribe(
                result => {
                  if(result && this.user.isAdmin) {
                    this.isLoading = false;
                    return this.router.navigate(['/admin'])
                  
                  }
                  
                  if(result && !this.user.isAdmin) {
                    this.isLoading = false;
                    return this.router.navigate(['/candidate'])
                  }
                  },
                (errorMessage) => {
                  this.isLoading = false;
                  this.error = errorMessage;
                }
              )
  }

  setInputBorderClass() {
    return {
      inputBorderAdmin: this.isAdminLink,
      inputBorderCandidate: !this.isAdminLink
    }
  }

  setBtnBgClass() {
    return {
      btnBgAdmin: this.isAdminLink,
      btnBgCandidate: !this.isAdminLink
    }
  }
}
