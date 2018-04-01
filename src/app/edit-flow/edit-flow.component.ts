import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Flow} from '../domain/flow';
import {AppGlobalField} from '../core/app-global-field';
import {Plugin} from '../domain/plugin';
import {PluginsResponse} from '../domain/response/plugins-response';
import {FlowService} from '../service/flow.service';
import {ExceptionService} from '../service/exception.service';

@Component({
  selector: 'app-edit-flow',
  templateUrl: './edit-flow.component.html',
  styleUrls: ['./edit-flow.component.css']
})
export class EditFlowComponent implements OnInit {

  showMessage: string;

  flow: Flow;
  currentRepoBranches: string[];
  currentPlugins: Plugin[] = [];
  pluginsResponse: PluginsResponse;

  constructor(private route: ActivatedRoute,
              private flowService: FlowService,
              private exceptionService: ExceptionService) {
  }

  ngOnInit() {
    this.getCurrentFlow();
    this.getCurrentRepoBranches();

    // 获取 EasyCI 的 Plugin 列表
    this.flowService.getPlugins()
      .subscribe(result => this.handleGetPlugins(result));
  }

  /**
   * 通过路由中的 flowId 得到当前选中的 Flow 信息
   */
  getCurrentFlow(): void {
    const flowId: string = this.route.snapshot.paramMap.get('flowId');
    for (const tempFlow of JSON.parse(localStorage.getItem(AppGlobalField.flows))) {
      if (tempFlow.id === flowId) {
        this.flow = tempFlow;
        break;
      }
    }
  }

  /**
   * 获取当前 Flow 的仓库所包含的分支列表
   */
  getCurrentRepoBranches(): void {
    for (const repo of JSON.parse(localStorage.getItem(AppGlobalField.githubAccountResponse)).githubRepos) {
      if (repo.id === this.flow.repoId) {
        this.currentRepoBranches = repo.branchs;
        break;
      }
    }
  }

  /**
   * 处理获得的 Plugin 列表数据
   * @param {Plugin[]} plugins
   */
  handleGetPlugins(pluginsResponse: PluginsResponse): void {
    if (pluginsResponse.plugins != null) {
      this.pluginsResponse = pluginsResponse;
      localStorage.setItem(AppGlobalField.pluginsResponse, JSON.stringify(pluginsResponse));
    } else if (pluginsResponse.error != null) {
      this.showMessage = '【系统支持插件列表】获取失败！ ' + pluginsResponse.message;
    } else {
      this.exceptionService.handleError(pluginsResponse);
    }
  }
}
