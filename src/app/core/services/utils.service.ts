import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  //By default the admin link in the header is not clicked
 private isAdminLink = false;
 private linkChanged = new Subject<boolean>();

  constructor() { }

  getIsAdminLinkStatus() {
    return this.isAdminLink;
  }

  linkChandedListener() {
    return this.linkChanged.asObservable();
  }

  toggleAccessLink() {
    this.isAdminLink = !this.isAdminLink;
    this.linkChanged.next(this.isAdminLink);
  }

}
