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
   return this.authService.userSubject
                .pipe(
                    take(1),
                    exhaustMap(user => {
                      if(user && user.token) {
                        const modifiedRequest = request.clone({ 
                          headers: new HttpHeaders().set('Authorization', `Bearer ${user.token}`)
                        })
                        return next.handle(modifiedRequest);
                      }
                        else {
                          return next.handle(request);
                        }
                      })
                  )
   
  }
}
