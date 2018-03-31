import {Component, OnInit} from '@angular/core';
import {GithubAccountResponse} from '../domain/response/github-account-response';
import {AppGlobalField} from '../core/app-global-field';
import {FlowService} from '../service/flow.service';
import {ExceptionService} from '../service/exception.service';
import {PluginsResponse} from '../domain/response/plugins-response';
import {Plugin} from '../domain/plugin';

@Component({
  selector: 'app-create-flow',
  templateUrl: './create-flow.component.html',
  styleUrls: ['./create-flow.component.css']
})
export class CreateFlowComponent implements OnInit {

  showMessage: string;
  githubAccountResponse: GithubAccountResponse;
  pluginsResponse: PluginsResponse;
  currentPlugins: Plugin[] = [];

  constructor(private flowService: FlowService,
              private exceptionService: ExceptionService) {
  }

  ngOnInit() {
    // 判断是否已经获得 Github 授权，并标记
    if (localStorage.getItem(AppGlobalField.githubAccountResponse) != null) {
      this.githubAccountResponse = JSON.parse(localStorage.getItem(AppGlobalField.githubAccountResponse));
    }

    // 获取 EasyCI 的 Plugin 列表
    this.flowService.getPlugins()
      .subscribe(result => this.handleGetPlugins(result));
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

  /**
   * 在 Flow 末尾添加一个插件
   * @param {Plugin} plugin
   */
  addOneOnCurrentPlugins(plugin: Plugin): void {
    if (this.currentPlugins.indexOf(plugin) === -1) {
      this.showMessage = null;
      this.currentPlugins.push(plugin);
    } else {
      this.showMessage = '该插件已选择，请选择其他插件！';
    }
  }

  /**
   * 移除已选插件中指定的项
   * @param {Plugin} plugin
   */
  removeOneOnCurrentPlugins(plugin: Plugin): void {
    const index: number = this.currentPlugins.indexOf(plugin);
    const frontPlugins: Plugin[] = this.currentPlugins.slice(0, index);
    const backPlugins: Plugin[] = this.currentPlugins.slice(index + 1, this.currentPlugins.length);
    this.currentPlugins = frontPlugins.concat(backPlugins);
  }
}
