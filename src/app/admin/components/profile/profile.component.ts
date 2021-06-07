import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { ProfilFormService } from './../../../candidate/services/profil-form.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdminResponseData } from 'src/app/core/models/admin-response-data';
import { User } from 'src/app/core/models/connected.user';
import { startWith, switchMap } from 'rxjs/operators';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  admin: AdminResponseData = null;

  user : User;
  
  basicInfoForm: FormGroup;

  userSub: Subscription;
  
  constructor(private profilFormService: ProfilFormService,
              private adminService: AdminService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.initBasicInfoForm();

    this.userSub = this.authService.user$
                                    .pipe(
                                      startWith(this.authService.user),
                                      // tap((user)=> {
                                      //   console.log('User from tap Operator', user);
                                      // }),
                                      switchMap(user => {
                                      //  console.log("User from switchMap", user);
                                        
                                        this.user = user;
                                        return this.adminService
                                                    .getOne<AdminResponseData>(user?.id);
                                      })
                                    ).subscribe(
                                      //we should patch all the form here
                                      //using loadash if necessary
                                      (result: AdminResponseData) => {
                                      console.log("Result from candidate service", result);

                                      this.admin = result;
                                      this.basicInfoForm.patchValue(result)

                                      }
                                    );

  }

  
  
  initBasicInfoForm() {
    //we need the json from this form only only when subitting data
   return this.basicInfoForm = this.profilFormService.toProfilFormGroup();
  }
}
