import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GithubHookRequest} from '../domain/request/github-hook-request';
import {Observable} from 'rxjs/Observable';
import {CommonOkResponse} from '../domain/response/common-ok-response';
import {AppConfiguration} from '../core/app-configuration';
import {BuildDetailResponse} from '../domain/response/build-detail-response';
import {AppGlobalField} from '../core/app-global-field';

@Injectable()
export class TaskService {

  constructor(private http: HttpClient) {
  }

  /**
   * 触发构建任务
   * @param {GithubHookRequest} githubHookRequest
   * @param {string} flowId
   * @returns {Observable<CommonOkResponse>}
   */
  trigger(githubHookRequest: GithubHookRequest, flowId: string): Observable<CommonOkResponse> {
    const myHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<CommonOkResponse>(AppConfiguration.taskTrigger + '/' + flowId, githubHookRequest, myHeaders);
  }

  /**
   * 获取当前 Flow 最新任务构建列表（倒序）
   * @param {string} flowId
   * @returns {Observable<BuildDetailResponse>}
   */
  upToDate(flowId: string): Observable<BuildDetailResponse> {
    const myHeaders = {
      headers: new HttpHeaders({
        'Authorization': JSON.parse(localStorage.getItem(AppGlobalField.loginResponse)).userToken
      })
    };
    return this.http.get<BuildDetailResponse>(AppConfiguration.taskUpToDate + '/' + flowId, myHeaders);
  }
}
