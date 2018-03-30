import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Flow} from '../domain/flow';
import {AppGlobalField} from '../core/app-global-field';
import {AppConfiguration} from '../core/app-configuration';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FlowService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Flow[]> {
    const myHeaders = {
      headers: new HttpHeaders({
        'Authorization': JSON.parse(localStorage.getItem(AppGlobalField.loginResponse)).userToken
      })
    };
    return this.http.get<Flow[]>(AppConfiguration.flowGetAll, myHeaders);
  }
}
