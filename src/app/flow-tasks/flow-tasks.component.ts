import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Flow} from '../core/domain/flow';
import {AppGlobalField} from '../core/app-global-field';
import {GithubHookRequest} from '../core/domain/request/github-hook-request';
import {TaskService} from '../core/service/task.service';
import {CommonOkResponse} from '../core/domain/response/common-ok-response';
import {ExceptionService} from '../core/service/exception.service';
import {BuildDetailResponse} from '../core/domain/response/build-detail-response';
import {GithubRepo} from '../core/domain/github-repo';
import {ReposService} from '../core/service/repos.service';
import {GithubAccountResponse} from '../core/domain/response/github-account-response';
import Timer = NodeJS.Timer;

@Component({
  selector: 'app-flow-tasks',
  templateUrl: './flow-tasks.component.html',
  styleUrls: ['./flow-tasks.component.css']
})
export class FlowTasksComponent implements OnInit, OnDestroy {

  dataReady: boolean;
  showMessage: string;
  flow: Flow;
  buildDetailResponse: BuildDetailResponse;
  githubRepo: GithubRepo;
  intervalForTaskUpToDate: Timer;

  constructor(private route: ActivatedRoute,
              private taskService: TaskService,
              private exceptionService: ExceptionService,
              private reposService: ReposService) {
  }

  ngOnInit() {
    this.dataReady = false;
    // 间隔 1 秒再刷新一次本地数据，使得编辑过工作流后，能够展示最新数据
    setTimeout(() => this.getCurrentFlowAndRepo(), 200);
    setTimeout(() => this.taskUpToDate(), 250);

    // 设置一个定时器，通过间隔时间刷新当前构件列表数据
    this.intervalForTaskUpToDate = setInterval(() => this.taskUpToDate(), AppGlobalField.flowTasksTimeout);
  }

  ngOnDestroy() {
    // 销毁定时器
    clearInterval(this.intervalForTaskUpToDate);
  }

  /**
   * 通过路由中的 flowName 得到当前选中的 Flow 信息
   */
  private getCurrentFlowAndRepo(): void {
    const flowName: string = this.route.snapshot.paramMap.get('flowName');
    for (const tempFlow of JSON.parse(localStorage.getItem(AppGlobalField.flows))) {
      if (tempFlow.name === flowName) {
        this.flow = tempFlow;
        break;
      }
    }

    // 获取当前 Flow 对应的原仓库信息
    if (localStorage.getItem(AppGlobalField.githubAccountResponse) == null) {
      this.reposService.getGithubAccount()
        .subscribe(result => this.handleGetGithubAccount(result));
    } else {
      for (const tempGithubRepo of JSON.parse(localStorage.getItem(AppGlobalField.githubAccountResponse)).githubRepos) {
        if (tempGithubRepo.id === this.flow.repoId) {
          this.githubRepo = tempGithubRepo;
        }
      }
    }
  }

  /**
   * 处理获取当前 GitHubAccount 并更新当前 githubRepo
   * @param {GithubAccountResponse} githubAccountResponse
   */
  private handleGetGithubAccount(githubAccountResponse: GithubAccountResponse): void {
    if (githubAccountResponse.githubAccount != null) {
      localStorage.setItem(AppGlobalField.githubAccountResponse, JSON.stringify(githubAccountResponse));
      for (const tempGithubRepo of githubAccountResponse.githubRepos) {
        if (tempGithubRepo.id === this.flow.repoId) {
          this.githubRepo = tempGithubRepo;
        }
      }
    }
  }

  /**
   * 手动触发构建任务
   * @param {string} triggerBranch
   */
  taskTrigger(triggerBranch: string): void {
    const githubHookRequest: GithubHookRequest = new GithubHookRequest(null, true, triggerBranch);
    this.taskService.trigger(githubHookRequest, this.flow.id)
      .subscribe(result => this.handleTaskTrigger(result));
  }

  /**
   * 处理手动触发构建任务
   * @param {CommonOkResponse} commonOkResponse
   */
  private handleTaskTrigger(commonOkResponse: CommonOkResponse): void {
    if (commonOkResponse.code != null) {
      this.showMessage = null;
      // 手动触发构建成功！
      this.taskUpToDate();
    } else if (commonOkResponse.error != null) {
      // 手动触发构建失败！
      this.showMessage = '【手动触发构建】失败！ ' + commonOkResponse.message;
    } else {
      this.exceptionService.handleError(commonOkResponse);
    }
  }

  /**
   * 获取当前 Flow 最新任务构建列表（倒序）
   */
  private taskUpToDate(): void {
    this.taskService.upToDate(this.flow.id)
      .subscribe(result => this.handleTaskUpToDate(result));
  }

  /**
   * 处理获取当前 Flow 最新任务构建列表（倒序）
   * @param {BuildDetailResponse} buildDetailResponses
   */
  private handleTaskUpToDate(buildDetailResponse: BuildDetailResponse) {
    if (buildDetailResponse.buildDetails != null) {
      this.buildDetailResponse = buildDetailResponse;
      localStorage.setItem(AppGlobalField.buildDetailResponse, JSON.stringify(buildDetailResponse));
      // 数据读取成功！
      this.dataReady = true;
    } else if (buildDetailResponse.error != null) {
      this.showMessage = '【 Flow 最新构建列表】获取失败！ ' + buildDetailResponse.message;
    } else {
      this.exceptionService.handleError(buildDetailResponse);
    }
  }
}
