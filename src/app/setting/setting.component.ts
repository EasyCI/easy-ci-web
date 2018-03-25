import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {User} from '../domain/user';
import {CommonService} from '../service/common.service';
import {ExceptionService} from '../service/exception.service';
import {AppGlobalField} from '../core/app-global-field';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  user: User;
  showMessage: string;

  constructor(private userService: UserService,
              private commonService: CommonService,
              private exceptionService: ExceptionService) {
  }

  ngOnInit() {
  }

  /**
   * 用户修改密码
   * @param {string} oldPassword
   * @param {string} newPassword
   */
  changePassword(oldPassword: string, newPassword: string, againNewPassword: string): void {
    if (newPassword === againNewPassword) {
      this.showMessage = null;
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
      localStorage.removeItem(AppGlobalField.loginResponse);
      setTimeout(() => this.jumpTo('/login'), 1000);
    } else if (user.error != null) {
      this.showMessage = user.message;
      this.user = null;
    } else {
      this.exceptionService.handleError(user);
    }
  }

  jumpTo(url: string): void {
    this.commonService.jumpTo(url);
  }
}
