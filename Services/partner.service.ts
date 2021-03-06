import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'model/user';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PartnerService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      authentication: localStorage.getItem('authentication') || '',
    }),
  };

  creatUser(user: User): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'user/register/user',
      user,
      this.httpOptions
    );
  }

  creatPartner(user: User): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'user/register/partner',
      user,
      this.httpOptions
    );
  }

  LoginUser(user: User): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'user/login ',
      user,
      this.httpOptions
    );
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(environment.Api + 'user', this.httpOptions);
  }
  getLoggedUser(): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'user/loggedin',
      this.httpOptions
    );
  }

  getUserById(userId: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'user/' + userId,
      this.httpOptions
    );
  }

  updateUser(userId: any, user: any): Observable<any> {
    return this.http.put<any>(
      environment.Api + 'user/' + userId,
      user,
      this.httpOptions
    );
  }

  deleteUser(userId: any): Observable<any> {
    return this.http.delete<any>(
      environment.Api + 'user/' + userId,
      this.httpOptions
    );
  }
  readNotification(): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'user/read/notifications',
      this.httpOptions
    );
  }
  verifyUser(code: any): Observable<any> {
    return this.http.get<any>(environment.Api + 'user/confirm/' + code);
  }
}
