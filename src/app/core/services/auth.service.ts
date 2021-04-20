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

  constructor(private http: HttpClient) { }

  singIn(credentials) {
    return this.http
                .post<AuthResponseData>(this.url, credentials)
                .pipe(
                  tap(this.handleResponseData),
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

    if(responseData && token) {
      localStorage.setItem('token', JSON.stringify(responseData));
      }
      const user = new User(id, token, email, roles, username, name, imageUrl);
      this.userSubject.next(user);
  }

  handleAuthError(error: HttpErrorResponse) {
    let errorMessage = '';
    //client side error, network error
    if(error.error instanceof ErrorEvent) {
      errorMessage = `Ooops !!! Une erreur s'est produite... ${error.error.message}`;
      return throwError(errorMessage);
    } else { //error from the server, bad request etc...
      //Needs to handle 404, 500 error here, (not found)
      switch(error.status) {
        case 401:
          errorMessage = 'Identifiant ou mot de passe invalide';
          break;
        case 500:
          errorMessage = 'Une erreur est survenue au niveau du serveur';
          break;
        default:
          errorMessage = 'Une erreur innatendue est servenue'
      }
    }
    return throwError(errorMessage);
  }

  logout() {
    localStorage.removeItem('token');
  }
 
  isLoggedIn() {
    const helper = new JwtHelperService();
    const token = localStorage.getItem(JSON.parse('token'));
    if (!token) {
      return false;
    }
    const isExpired = helper.isTokenExpired(token);
    return !isExpired;
  }
}

