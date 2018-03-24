import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

import {User} from '../domain/user';
import {LoginResponse} from '../domain/response/login-response';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  private registerUrl = 'http://localhost:8080/user/register';
  private registerHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private loginUrl = 'http://localhost:8080/user/login';
  private loginHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };

  register(user: User): Observable<User> {
    return this.http.post<User>(this.registerUrl, user, this.registerHeaders);
  }

  login(email: string, password: string): Observable<LoginResponse> {
    const parameters = new HttpParams()
      .append('email', email)
      .append('password', password);
    return this.http.post<LoginResponse>(this.loginUrl, parameters, this.loginHeaders);
  }
}
