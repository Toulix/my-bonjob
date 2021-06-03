import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DataService } from './../../core/services/data.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UploadService  extends DataService {
    constructor(http: HttpClient) {
        super(`${environment.apiUrl}/users`,http);
    }
}

