import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      authentication: localStorage.getItem('authentication') || '',
    }),
  };
  getImages(path: string): Observable<Blob> {
    //console.log(environment.api_url+"/"+path);
    //console.log("inside service api ");
    return this.http.get(`${environment.Api}download/${path}`, {
      responseType: 'blob',
      headers: new HttpHeaders().append('content-type', 'application/json'),
    });
  }

  uploadImages(image: any): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'upload/image/multiple',
      image,
      this.httpOptions
    );
  }
  uploadImage(image: any): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'upload/image/single',
      image,
      this.httpOptions
    );
  }
}
