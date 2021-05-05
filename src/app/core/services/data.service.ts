import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CLIENT_SIDE_ERROR, DEFAULT_ERROR, INVALID_CREDENTIALS, SERVER_ERROR } from '../utils/constante';
import { throwError } from 'rxjs';
import { AuthResponseData } from '../models/auth.response.data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private endPoint, private http: HttpClient) { }

  getAll(){}

  getOne() {}

  create<T>(ressource) {
    return this.http.post<T>(this.endPoint, ressource)
                    .pipe(
                      catchError(this.handleError)
                    )}

  update(ressource) {}

  delete(id: string | number) {}


  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    //client side error, network error
    if(error.error instanceof ErrorEvent) {
      errorMessage = `${CLIENT_SIDE_ERROR}${error.error.message}`;
      return throwError(errorMessage);
    } else { //error from the server, bad request etc...
      //Needs to handle 404, 500 error here, (not found)
      console.log('Status: ', error.status);
      console.log('Error property: ', error.error);
      
      switch(error.status) {
        case 401:
          errorMessage = INVALID_CREDENTIALS;
          break;
        case 500:
          errorMessage = SERVER_ERROR;
          break;
        default: //status 0 => Unexpeted error
          errorMessage = DEFAULT_ERROR;
      }
    }
    return throwError(errorMessage);
  }
}
