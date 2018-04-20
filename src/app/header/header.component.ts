import {Component, OnInit} from '@angular/core';

import {AppGlobalField} from '../core/app-global-field';
import {UserService} from '../core/service/user.service';
import {CommonService} from '../core/service/common.service';
import {FlowService} from '../core/service/flow.service';
import {Flow} from '../core/domain/flow';
import {FlowTasksComponent} from '../flow-tasks/flow-tasks.component';
import {ActivatedRoute, UrlSegment} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginOrOut: string;
  loginOrOutIcon: string;
  loginResponse: string;
  flows: Flow[];
  flowListStatus: boolean;

  constructor(private userService: UserService,
              private commonService: CommonService,
              private flowService: FlowService,
              private flowTaskComponent: FlowTasksComponent,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    if ((this.loginResponse = localStorage.getItem(AppGlobalField.loginResponse)) == null) {
      // 未登录状态
      this.loginOrOut = '登录';
      this.loginOrOutIcon = 'oi-account-login';
    } else {
      // 登录状态
      this.loginOrOut = '退出';
      this.loginOrOutIcon = 'oi-account-logout';
      // 获取用户所有的工作流
      this.flowService.getAll().subscribe(result => this.handleflowGetAll(result));
    }
  }

  loginOrLogOut(): void {
    if (localStorage.getItem(AppGlobalField.loginResponse) == null) {
      this.jumpTo('/user/login');
    } else {
      localStorage.removeItem(AppGlobalField.loginResponse);
      localStorage.removeItem(AppGlobalField.githubAccountResponse);
      this.jumpTo('/user/login');
    }
  }

  /**
   * 开关左侧 Flow 列表
   */
  switchShowFlowList(): void {
    if (this.flowListStatus) {
      this.flowListStatus = false;
    } else {
      this.flowListStatus = true;
    }
  }

  /**
   * 切换不同的工作流详情
   * @param {string} url
   */
  switchFlowDetail(url: string): void {
    this.commonService.jumpTo(url);

    // 因为这个路由跳转到自身，所以需要强制刷新组件视图
    const uslSegment: UrlSegment[] = this.route.snapshot.url;
    if (uslSegment.length === 2 && uslSegment[0].path === 'flow' && uslSegment[1].path !== 'create') {
      this.flowTaskComponent.ngOnDestroy();
      this.flowTaskComponent.ngOnInit();
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
