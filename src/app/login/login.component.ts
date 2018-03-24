import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {LoginResponse} from '../domain/response/login-response';
import {AppGlobalField} from '../core/app-global-field';
import {ExceptionService} from '../service/exception.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginResponse: LoginResponse;
  showMessage: string;

  constructor(private exceptionService: ExceptionService,
              private userService: UserService) {
  }

  ngOnInit() {
  }

  /**
   * 用户登录
   * @param {string} email
   * @param {string} password
   */
  login(email: string, password: string): void {
    this.userService.login(email, password)
      .subscribe(result => this.handleLogin(result));
  }

  /**
   * 处理用户登录
   * @param {LoginResponse} loginResponse
   */
  handleLogin(loginResponse: LoginResponse): void {
    if (loginResponse.userToken != null) {
      this.loginResponse = loginResponse;
      this.showMessage = null;
      localStorage.setItem(AppGlobalField.currentUser, JSON.stringify(loginResponse));
    } else if (loginResponse.error != null) {
      this.showMessage = loginResponse.message;
      this.loginResponse = null;
    } else {
      this.exceptionService.handleError(loginResponse);
    }
  }
}
