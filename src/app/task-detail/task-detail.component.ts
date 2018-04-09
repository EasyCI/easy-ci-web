import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {AppGlobalField} from '../core/app-global-field';
import {BuildDetail} from '../core/domain/build-detail';
import {TaskService} from '../core/service/task.service';
import {BuildDetailResponse} from '../core/domain/response/build-detail-response';
import {ExceptionService} from '../core/service/exception.service';
import Timer = NodeJS.Timer;

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit, OnDestroy {

  dataReady: boolean;
  showMessage: string;
  currentBuildDetail: BuildDetail;
  flowName: string;
  intervalUpdateBuildDetail: Timer;

  constructor(private route: ActivatedRoute,
              private taskService: TaskService,
              private exceptionService: ExceptionService) {
  }

  ngOnInit() {
    this.dataReady = false;
    this.getCurrentTaskBuildDetail();

    this.flowName = this.route.snapshot.paramMap.get('flowName');

    // 如果当前任务正在构建中，则启动一个定时器定时更新最新构建数据
    if (this.currentBuildDetail.building) {
      this.intervalUpdateBuildDetail = setInterval(() => this.updateBuildDetail(), 5 * 1000);
    }
  }

  ngOnDestroy(): void {
    // 销毁定时器任务
    clearInterval(this.intervalUpdateBuildDetail);
  }

  /**
   * 获取当前任务的构建详情
   */
  getCurrentTaskBuildDetail(): void {
    const taskQueueNumber: string = this.route.snapshot.paramMap.get('taskQueueNumber');
    for (const tempBuildDetail of JSON.parse(localStorage.getItem(AppGlobalField.buildDetailResponse)).buildDetails) {
      if (taskQueueNumber === tempBuildDetail.queueNumber.toString()) {
        this.currentBuildDetail = tempBuildDetail;
      }
    }
    this.dataReady = true;
  }

  /**
   * 获取当前 Flow 最新任务构建列表（倒序）
   */
  updateBuildDetail(): void {
    this.taskService.upToDate(this.currentBuildDetail.flowId)
      .subscribe(result => this.handleTaskUpToDate(result));
  }

  /**
   * 处理获取当前 Flow 最新任务构建列表（倒序）
   * @param {BuildDetailResponse} buildDetailResponses
   */
  private handleTaskUpToDate(buildDetailResponse: BuildDetailResponse) {
    const taskQueueNumber: string = this.route.snapshot.paramMap.get('taskQueueNumber');
    if (buildDetailResponse.buildDetails != null) {
      for (const tempBuildDetail of buildDetailResponse.buildDetails) {
        if (taskQueueNumber === tempBuildDetail.queueNumber.toString()) {
          this.currentBuildDetail = tempBuildDetail;
        }
      }
      localStorage.setItem(AppGlobalField.buildDetailResponse, JSON.stringify(buildDetailResponse));
      // 如果构建结束，销毁定时更新的定时器
      if (!this.currentBuildDetail.building) {
        clearInterval(this.intervalUpdateBuildDetail);
      }
    } else if (buildDetailResponse.error != null) {
      this.showMessage = '【 任务最新构建详情】获取失败！ ' + buildDetailResponse.message;
    } else {
      this.exceptionService.handleError(buildDetailResponse);
    }
  }
}
