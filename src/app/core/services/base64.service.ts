import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class Base64Service {

  constructor() { }

  getBase64(file: File): Observable<string | ArrayBuffer> {
     return new Observable(observer=> {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => observer.next(reader.result);
      reader.onerror = error => observer.error(error);
    })
  } 
}
