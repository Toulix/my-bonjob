import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userInfo = this.authService.getUserInfoFromLocalStorage();

    // return this.authService.user$
    //             .pipe(
    //                 take(1),
    //                 exhaustMap(user => {
    //                   console.log("User in the authInterceptor", user);
                      //if we have a token and the token is not expired
                      if(userInfo && !this.authService.isTokenExpired()) {
                        const modifiedRequest = request.clone({ 
                          headers: new HttpHeaders().set('Authorization', `Bearer ${userInfo._token}`)
                        })
                       console.log("Auth interceptor called, with token", modifiedRequest);
                        return next.handle(modifiedRequest);
                      }
                        else {
                          console.log("Auth interceptor called, without token", request);
                          return next.handle(request);
                        }
                  //     })
                  // )
   
  }
}
