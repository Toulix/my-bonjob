import { HttpClient } from '@angular/common/http';
import { DataService } from './../../core/services/data.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class SignUpService  extends DataService {
    constructor(http: HttpClient) {
        super(`${environment.apiUrl}/register`,http);
    }
}