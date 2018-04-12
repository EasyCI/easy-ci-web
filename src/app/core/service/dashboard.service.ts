import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppGlobalField} from '../app-global-field';
import {AppBackEndApi} from '../app-back-end-api';
import {Observable} from 'rxjs/Observable';
import {FlowDetailResponse} from '../domain/response/FlowDetailResponse';

@Injectable()
export class DashboardService {

  constructor(private http: HttpClient) {
  }

  /**
   * 获取 Flow 详情列表数据，包括构建成功失败数据等，用以首页仪表板展示
   * @returns {Observable<FlowDetailResponse>}
   */
  getFlowDetails(): Observable<FlowDetailResponse> {
    const myHeaders = {
      headers: new HttpHeaders({
        'Authorization': JSON.parse(localStorage.getItem(AppGlobalField.loginResponse)).userToken
      })
    };
    return this.http.get<FlowDetailResponse>(AppBackEndApi.dashboardGetFlowDetails, myHeaders);
  }
}
