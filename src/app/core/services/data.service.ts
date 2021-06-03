import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CLIENT_SIDE_ERROR, DEFAULT_ERROR, INVALID_CREDENTIALS, SERVER_ERROR } from '../utils/constante';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private endPoint, private http: HttpClient) { }

  getAll(){}

  getMockCandidate<T>(id) {
    const url = 'assets/mock.candidate.json';
    return this.http.get<T>(url)
                    .pipe(
                      catchError(this.handleError)
                    )
  }

  getOne<T>(id){
    return this.http.get<T>(`${this.endPoint}/${id}`)
                    .pipe(
                      catchError(this.handleError)
                    )
  }

 create<T>(ressource) {
    return this.http.post<T>(this.endPoint, ressource)
                    .pipe(
                      catchError(this.handleError)
                    )}

  update<T>(id, ressource) {
    return this.http.patch<T>(`${this.endPoint}/${id}`, ressource).pipe(
                              catchError(this.handleError)
                                  )}

  // update(id, ressource) {
  //   return this.http.patch(`${this.endPoint}/${id}`, ressource)
  //                   .pipe(
  //                     catchError(this.handleError)
  //                   )
  // }

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
