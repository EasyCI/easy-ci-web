import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {Flow} from '../domain/flow';
import {AppGlobalField} from '../core/app-global-field';
import {AppConfiguration} from '../core/app-configuration';
import {PluginsResponse} from '../domain/response/plugins-response';
import {DeleteFlowRequest} from '../domain/request/delete-flow-request';
import {CommonOkResponse} from '../domain/response/common-ok-response';

@Injectable()
export class FlowService {

  constructor(private http: HttpClient) {
  }

  /**
   * 获取系统支持的插件列表
   * @returns {Observable<Plugin[]>}
   */
  getPlugins(): Observable<PluginsResponse> {
    const myHeaders = {
      headers: new HttpHeaders({
        'Authorization': JSON.parse(localStorage.getItem(AppGlobalField.loginResponse)).userToken
      })
    };
    return this.http.get<PluginsResponse>(AppConfiguration.flowGetPlugins, myHeaders);
  }

  /**
   * 创建一个 Flow
   * @param {Flow} flow
   * @returns {Observable<Flow>}
   */
  create(flow: Flow): Observable<Flow> {
    const myHeaders = {
      headers: new HttpHeaders({
        'Authorization': JSON.parse(localStorage.getItem(AppGlobalField.loginResponse)).userToken,
        'X-GitHub-Access-Token': JSON.parse(localStorage.getItem(AppGlobalField.githubAccountResponse)).githubAccount.accessToken,
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Flow>(AppConfiguration.flowCreate, flow, myHeaders);
  }

  /**
   * 编辑 Flow
   * @param {Flow} flow
   * @returns {Observable<Flow>}
   */
  edit(flow: Flow): Observable<Flow> {
    const myHeaders = {
      headers: new HttpHeaders({
        'Authorization': JSON.parse(localStorage.getItem(AppGlobalField.loginResponse)).userToken,
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Flow>(AppConfiguration.flowEdit, flow, myHeaders);
  }

  /**
   * 获取已创建的全部工作流
   * @returns {Observable<Flow[]>}
   */
  getAll(): Observable<Flow[]> {
    const myHeaders = {
      headers: new HttpHeaders({
        'Authorization': JSON.parse(localStorage.getItem(AppGlobalField.loginResponse)).userToken
      })
    };
    return this.http.get<Flow[]>(AppConfiguration.flowGetAll, myHeaders);
  }

  /**
   * 删除 Flow
   * @param {DeleteFlowRequest} deleteFlowRequest
   * @returns {Observable<CommonOkResponse>}
   */
  delete(deleteFlowRequest: DeleteFlowRequest): Observable<CommonOkResponse> {
    const myHeaders = {
      headers: new HttpHeaders({
        'Authorization': JSON.parse(localStorage.getItem(AppGlobalField.loginResponse)).userToken,
        'X-GitHub-Access-Token': JSON.parse(localStorage.getItem(AppGlobalField.githubAccountResponse)).githubAccount.accessToken,
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<CommonOkResponse>(AppConfiguration.flowDelete, deleteFlowRequest, myHeaders);
  }
}
