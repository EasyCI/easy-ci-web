import {Component, OnInit} from '@angular/core';

import {UserService} from '../core/service/user.service';
import {User} from '../core/domain/user';
import {ExceptionService} from '../core/service/exception.service';
import {AppGlobalField} from '../core/app-global-field';
import {CommonService} from '../core/service/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  user: User;
  showMessage: string;

  constructor(private exceptionService: ExceptionService,
              private userService: UserService,
              private commonService: CommonService) {
  }

  ngOnInit() {
    if (localStorage.getItem(AppGlobalField.loginResponse) != null) {
      // 已登录，跳转到仪表盘
      this.jumpTo('/dashboard');
    }
  }

  /**
   * 用户注册
   * @param {string} username
   * @param {string} email
   * @param {string} password
   */
  register(username: string, email: string, password: string): void {
    const user: User = new User(email, username, password);
    this.userService.register(user)
      .subscribe(result => this.handleRegister(result));
  }

  /**
   * 处理用户注册
   * @param {User} user
   */
  private handleRegister(user: User): void {
    if (user.email != null) {
      this.user = user;
      this.showMessage = null;
    } else if (user.error != null) {
      this.showMessage = user.message;
      this.user = null;
    } else {
      this.exceptionService.handleError(user);
    }
  }

  private jumpTo(url: string): void {
    this.commonService.jumpTo(url);
  }
}
