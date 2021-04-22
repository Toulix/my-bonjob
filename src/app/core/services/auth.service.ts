import { SERVER_ERROR, INVALID_CREDENTIALS, DEFAULT_ERROR, CLIENT_SIDE_ERROR } from './../utils/constante';
import { Router } from '@angular/router';
import { AuthResponseData } from './../models/auth.response.data';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs'
import { environment } from 'src/environments/environment';
import { User } from '../models/connected.user';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = `${environment.apiUrl}/login_check`;
  userSubject = new BehaviorSubject<User>(null);
  private expirationTimer: any;

  constructor(private http: HttpClient,
              private route: Router) { }

  singIn(credentials) {
    return this.http
                .post<AuthResponseData>(this.url, credentials)
                .pipe(
                  tap((responseData) => {
                    this.handleResponseData(responseData);
                  }),
                  catchError(this.handleAuthError)
                )
             }
            

  handleResponseData(responseData: AuthResponseData) {
    const { id, 
            token,
            email,
            roles,
            username,
            name,
            imageUrl 
              } = responseData;
              console.log(responseData);
              
      const user = new User(token, roles, id, email, username, name, imageUrl);
      console.log(user);
      
      this.userSubject.next(user);
     // this.autoLogout(user.tokenExpirationDate.getTime());
      localStorage.setItem('userData', JSON.stringify(responseData));
  }

  handleAuthError(error: HttpErrorResponse) {
    let errorMessage = '';
    //client side error, network error
    if(error.error instanceof ErrorEvent) {
      errorMessage = `${CLIENT_SIDE_ERROR}${error.error.message}`;
      return throwError(errorMessage);
    } else { //error from the server, bad request etc...
      //Needs to handle 404, 500 error here, (not found)
      switch(error.status) {
        case 401:
          errorMessage = INVALID_CREDENTIALS;
          break;
        case 500:
          errorMessage = SERVER_ERROR;
          break;
        default:
          errorMessage = DEFAULT_ERROR;
      }
    }
    return throwError(errorMessage);
  }


  autoLogin() {
    const userData: AuthResponseData = JSON.parse(localStorage.getItem('userData'));
    if(!userData) {
      return;
    }
    const loadedUser = new User(userData.token,
                                userData.roles,
                                userData.id,
                                userData.email,
                                userData.username,
                                userData.name,
                                userData.imageUrl);
      //check if that user has a token and that token is valid and not expired
          if(loadedUser.token) {
            this.userSubject.next(loadedUser)
            console.log(' Expiration date: ', loadedUser.tokenExpirationDate);
            
            this.autoLogout(loadedUser.tokenExpirationDate.getTime() - new Date().getTime())
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
    const helper = new JwtHelperService();
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return false;
    }
  
    const isExpired = helper.isTokenExpired(userData.token);
    return !isExpired;
  }
}

