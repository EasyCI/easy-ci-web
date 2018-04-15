import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../core/service/dashboard.service';
import {FlowDetailResponse} from '../core/domain/response/FlowDetailResponse';
import {AppGlobalField} from '../core/app-global-field';
import {ExceptionService} from '../core/service/exception.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showMessage: string;
  flowDetailResponse: FlowDetailResponse;

  showHelp: boolean;

  constructor(private dashboardService: DashboardService,
              private exceptionService: ExceptionService) {
  }

  ngOnInit() {
    this.getFlowDetails();
  }

  /**
   * 获取 Flow 详情列表数据，包括构建成功失败数据等，用以首页仪表板展示
   */
  getFlowDetails(): void {
    this.dashboardService.getFlowDetails()
      .subscribe(result => this.handleGetFlowDetails(result));
  }

  /**
   * 处理获取 Flow 详情列表数据，用于首页仪表板展示
   * @param {FlowDetailResponse} result
   */
  private handleGetFlowDetails(flowDetailResponse: FlowDetailResponse) {
    if (flowDetailResponse.flowDetails != null) {
      this.flowDetailResponse = flowDetailResponse;
      localStorage.setItem(AppGlobalField.flowDetailResponse, JSON.stringify(flowDetailResponse));
    } else if (flowDetailResponse.error != null) {
      this.showMessage = '【 Flow 最新构建详情数据】获取失败！ ' + flowDetailResponse.message;
    } else {
      this.exceptionService.handleError(flowDetailResponse);
    }
  }
}
