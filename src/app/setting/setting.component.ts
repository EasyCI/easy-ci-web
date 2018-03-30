import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {User} from '../domain/user';
import {CommonService} from '../service/common.service';
import {ExceptionService} from '../service/exception.service';
import {AppGlobalField} from '../core/app-global-field';
import {GithubAccountResponse} from '../domain/response/github-account-response';
import {ReposService} from '../service/repos.service';
import {GithubAuthUrlResponse} from '../domain/response/github-auth-url-response';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  showMessage: string;
  user: User;
  githubAccountResponse: GithubAccountResponse;
  beginAuth: number;

  constructor(private userService: UserService,
              private commonService: CommonService,
              private exceptionService: ExceptionService,
              private reposService: ReposService) {
  }

  ngOnInit() {
    this.getGithubAccount();
  }

  /**
   * 获取 Github 授权地址，并去为应用授权
   */
  goToAuthorize(): void {
    this.reposService.getGithubAuthUrl()
      .subscribe(result => this.handleGetGithubAuthUrl(result));
  }

  /**
   * 处理授权请求，启动新窗口操作
   * @param {GithubAuthUrlResponse} githubAuthUrlResponse
   */
  handleGetGithubAuthUrl(githubAuthUrlResponse: GithubAuthUrlResponse): void {
    this.beginAuth = 1;
    window.open(githubAuthUrlResponse.url, '_blank');
  }

  getGithubAccount(): void {
    this.reposService.getGithubAccount()
      .subscribe(result => this.handleGetGithubAccount(result));
  }

  handleGetGithubAccount(githubAccountResponse: GithubAccountResponse): void {
    if (githubAccountResponse.githubAccount != null) {
      this.githubAccountResponse = githubAccountResponse;
      this.showMessage = null;
      this.user = null;
      this.beginAuth = null;
      localStorage.setItem(AppGlobalField.githubAccountResponse, JSON.stringify(githubAccountResponse));
    }
  }

  /**
   * 用户修改密码
   * @param {string} oldPassword
   * @param {string} newPassword
   */
  changePassword(oldPassword: string, newPassword: string, againNewPassword: string): void {
    if (newPassword === againNewPassword) {
      this.showMessage = null;
      this.githubAccountResponse = null;
      this.userService.changePassword(oldPassword, newPassword)
        .subscribe(result => this.handleChangePassword(result));
    } else {
      this.showMessage = '两次输入的新密码不相同！';
    }
  }

  /**
   * 处理用户修改密码
   * @param {User} user
   */
  handleChangePassword(user: User): void {
    if (user.email != null) {
      this.user = user;
      this.showMessage = null;
      this.githubAccountResponse = null;
      localStorage.removeItem(AppGlobalField.loginResponse);
      setTimeout(() => this.jumpTo('/login'), 1000);
    } else if (user.error != null) {
      this.showMessage = user.message;
      this.user = null;
      this.githubAccountResponse = null;
    } else {
      this.exceptionService.handleError(user);
    }
  }

  jumpTo(url: string): void {
    this.commonService.jumpTo(url);
  }
}
