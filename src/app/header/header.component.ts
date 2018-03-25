import {Component, OnInit} from '@angular/core';
import {AppGlobalField} from '../core/app-global-field';
import {UserService} from '../service/user.service';
import {CommonService} from '../service/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginOrOut: string;
  loginResponse: string;

  constructor(private userService: UserService,
              private commonService: CommonService) {
  }

  ngOnInit() {
    if ((this.loginResponse = localStorage.getItem(AppGlobalField.loginResponse)) == null) {
      this.loginOrOut = '登录';
    } else {
      this.loginOrOut = '退出';
    }
  }

  loginOrLogOut(): void {
    if (localStorage.getItem(AppGlobalField.loginResponse) == null) {
      this.jumpTo('/login');
    } else {
      localStorage.removeItem(AppGlobalField.loginResponse);
      this.jumpTo('/login');
    }
  }

  jumpTo(url: string): void {
    this.commonService.jumpTo(url);
  }
}
