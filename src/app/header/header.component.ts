import {Component, OnInit} from '@angular/core';

import {AppGlobalField} from '../core/app-global-field';
import {UserService} from '../core/service/user.service';
import {CommonService} from '../core/service/common.service';
import {FlowService} from '../core/service/flow.service';
import {Flow} from '../core/domain/flow';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginOrOut: string;
  loginResponse: string;
  flows: Flow[];

  constructor(private userService: UserService,
              private commonService: CommonService,
              private flowService: FlowService) {
  }

  ngOnInit() {
    if ((this.loginResponse = localStorage.getItem(AppGlobalField.loginResponse)) == null) {
      // 未登录状态
      this.loginOrOut = '登录';
    } else {
      // 登录状态
      this.loginOrOut = '退出';
      // 获取用户所有的工作流
      this.flowService.getAll().subscribe(result => this.handleflowGetAll(result));
    }
  }

  loginOrLogOut(): void {
    if (localStorage.getItem(AppGlobalField.loginResponse) == null) {
      this.jumpTo('/user/login');
    } else {
      localStorage.removeItem(AppGlobalField.loginResponse);
      this.jumpTo('/user/login');
    }
  }

  private handleflowGetAll(flows: Flow[]): void {
    this.flows = flows;
    localStorage.setItem(AppGlobalField.flows, JSON.stringify(flows));
  }

  private jumpTo(url: string): void {
    this.commonService.jumpTo(url);
  }
}
