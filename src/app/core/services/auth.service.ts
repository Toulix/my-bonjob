import { DataService } from './data.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, exhaustMap, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { User } from '../models/connected.user';
import { AuthResponseData } from './../models/auth.response.data';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends DataService {

  userSubject = new BehaviorSubject<User>(null);
  user: User;

  private expirationTimer: any;

  constructor(http: HttpClient,
              private route: Router) { 
              super(`${environment.apiUrl}/login_check`, http);
         }

  singIn(credentials) {
    return this.create<AuthResponseData>(credentials)
                .pipe(
                  tap((responseData) => {
                    console.log("responseDAta ", responseData);
                    
                    this.handleResponseData(responseData);
                  }))
                }
 
  emitUser(user: User) {
    return this.userSubject.next(user);
  }
//
  user$ = this.userSubject.asObservable();

  getCurrentUser$() {
   // console.log("get Current user called");
    
    return this.userSubject.pipe(
                take(1),
                exhaustMap((user: User) =>{
                //  console.log("User from exhaustd map", user);
                  return of(user);
                })
              )
    }
            

  handleResponseData(responseData: AuthResponseData) {
    const { id, 
            token,
            email,
            roles,
            lastname,
            firstname,
            expiredIn 
              } = responseData;
      
   const expirationDate = new Date(new Date().getTime() + expiredIn * 1000);

   if(!responseData.imageUrl) {
        this.user = new User(token, 
                              roles,
                              id,
                              email,
                              lastname,
                              firstname,
                              null, // the property is called imageUrl in the user Object
                              null, // the property is called imageName in the user Object
                              expirationDate);

        }  else {
              const {
                imageUrl: {
                    name,
                    url
                  }
                } = responseData;

              this.user = new User(token, 
                  roles,
                  id,
                  email,
                  lastname,
                  firstname,
                  url, // the property is called imageUrl in the user Object
                  name, // the property is called imageName in the user Object
                  expirationDate);
            }
     
      this.userSubject.next(this.user);
      localStorage.setItem('userData', JSON.stringify(this.user));
  }

  autoLogin() {
    //Local storage does not reflect the database state
    //when refreshing the page, it needs to be fixed
    console.log("AutoLogin Called");
    
    const userData = JSON.parse(localStorage.getItem('userData'));
    if(!userData) {
      return;
    }
    const loadedUser = new User(userData._token,
                                userData.roles,
                                userData.id,
                                userData.email,
                                userData.lastname,
                                userData.firstname,
                                userData.imageUrl,
                                userData.imageName,
                                new Date(userData.expirationDate));
      //check if that user has a token and that token is valid and not expired
      console.log("Loaded user ", loadedUser);
      
          if(loadedUser.token) {
            this.userSubject.next(loadedUser)
            this.autoLogout((loadedUser.expirationDate).getTime() - new Date().getTime())
          }
    }


  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('userData');
    this.route.navigate['/'];
    if(this.expirationTimer) {
      clearTimeout(this.expirationTimer);
    }
    this.expirationTimer = null;
  }

  autoLogout(expirationDuration) {
    this.expirationTimer = setTimeout(()=> {
         this.logout();
       }, 
       expirationDuration
       )}

 
  isLoggedIn() {
    //if we don't have a token, that means the user is not logged in
    if (!this.getToken()) {
      return false;
    }
    //If the token is expired, the user is not logged in
    const isExpired = this.isTokenExpired();
    return !isExpired;
  }

  isTokenExpired() {
    const userData = this.getToken();
    return (new Date() > userData.expirationDate) ? true : false;
  }

//Get user information from local storage
  getToken() {
    return JSON.parse(localStorage.getItem('userData'));
  }
}

