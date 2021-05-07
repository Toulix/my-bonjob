import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DataService } from './../../core/services/data.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SignUpService  extends DataService {
    constructor(http: HttpClient) {
        super(`${environment.apiUrl}/register`,http);
    }
}