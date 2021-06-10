import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private httpClient: HttpClient) { }

  download(url: string): Observable<Blob> {
    return this.httpClient.get(url, {
      responseType:'blob',
    })
  }
}
