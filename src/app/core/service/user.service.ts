import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {User} from '../domain/user';
import {LoginResponse} from '../domain/response/login-response';
import {AppBackEndApi} from '../app-back-end-api';
import {AppGlobalField} from '../app-global-field';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  register(user: User): Observable<User> {
    const myHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<User>(AppBackEndApi.userRegisterUrl, user, myHeaders);
  }

  login(email: string, password: string): Observable<LoginResponse> {
    const myHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const parameters = new HttpParams()
      .append('email', email)
      .append('password', password);
    return this.http.post<LoginResponse>(AppBackEndApi.userLoginUrl, parameters, myHeaders);
  }

  changePassword(oldPassword: string, newPassword: string): Observable<User> {
    const myHeaders = {
      headers: new HttpHeaders({
        'Authorization': JSON.parse(localStorage.getItem(AppGlobalField.loginResponse)).userToken,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const parameters = new HttpParams()
      .append('oldPassword', oldPassword)
      .append('newPassword', newPassword);
    return this.http.post<User>(AppBackEndApi.userChangePasswordUrl, parameters, myHeaders);
  }
}
