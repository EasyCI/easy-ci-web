import {Component, OnInit} from '@angular/core';
import {AppGlobalField} from '../core/app-global-field';
import {UserService} from '../service/user.service';
import {CommonService} from '../service/common.service';
import {FlowService} from '../service/flow.service';
import {Flow} from '../domain/flow';

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
      this.jumpTo('/login');
    } else {
      localStorage.removeItem(AppGlobalField.loginResponse);
      this.jumpTo('/login');
    }
  }

  handleflowGetAll(flows: Flow[]): void {
    this.flows = flows;
    localStorage.setItem(AppGlobalField.flows, JSON.stringify(flows));
  }

  jumpTo(url: string): void {
    this.commonService.jumpTo(url);
  }
}
