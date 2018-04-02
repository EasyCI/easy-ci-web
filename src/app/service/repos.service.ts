import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {AppGlobalField} from '../core/app-global-field';
import {AppConfiguration} from '../core/app-configuration';
import {GithubAccountResponse} from '../domain/response/github-account-response';
import {GithubAuthUrlResponse} from '../domain/response/github-auth-url-response';

@Injectable()
export class ReposService {

  constructor(private http: HttpClient) {
  }

  /**
   * 获取 GitHub 授权 Api 地址
   * @returns {Observable<string>}
   */
  getGithubAuthUrl(): Observable<GithubAuthUrlResponse> {
    const myHeaders = {
      headers: new HttpHeaders({
        'Authorization': JSON.parse(localStorage.getItem(AppGlobalField.loginResponse)).userToken
      })
    };
    return this.http.get<GithubAuthUrlResponse>(AppConfiguration.reposGetGithubAuthUrl, myHeaders);
  }

  /**
   * 获取已经授权的 GitHub 账户信息及仓库列表
   * @returns {Observable<GithubAccountResponse>}
   */
  getGithubAccount(): Observable<GithubAccountResponse> {
    const myHeaders = {
      headers: new HttpHeaders({
        'Authorization': JSON.parse(localStorage.getItem(AppGlobalField.loginResponse)).userToken
      })
    };
    return this.http.get<GithubAccountResponse>(AppConfiguration.reposGetGithubAccount, myHeaders);
  }

  /**
   * 更新（添加）一个 Github 账户信息到当前用户
   * @returns {Observable<GithubAccountResponse>}
   */
  updateGithubAccount(): Observable<GithubAccountResponse> {
    const myHeaders = {
      headers: new HttpHeaders({
        'Authorization': JSON.parse(localStorage.getItem(AppGlobalField.loginResponse)).userToken,
        'X-GitHub-Access-Token': JSON.parse(localStorage.getItem(AppGlobalField.githubAccountResponse)).githubAccount.accessToken
      })
    };
    return this.http.post<GithubAccountResponse>(AppConfiguration.reposUpdateGithubAccount, myHeaders);
  }
}
