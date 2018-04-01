import {Component, OnInit} from '@angular/core';
import {GithubAccountResponse} from '../domain/response/github-account-response';
import {AppGlobalField} from '../core/app-global-field';
import {FlowService} from '../service/flow.service';
import {ExceptionService} from '../service/exception.service';
import {PluginsResponse} from '../domain/response/plugins-response';
import {Plugin} from '../domain/plugin';
import {CreateFlowRequest} from '../domain/request/create-flow-request';


@Component({
  selector: 'app-create-flow',
  templateUrl: './create-flow.component.html',
  styleUrls: ['./create-flow.component.css']
})
export class CreateFlowComponent implements OnInit {

  showMessage: string;
  githubAccountResponse: GithubAccountResponse;
  pluginsResponse: PluginsResponse;

  // html 页面中双向绑定的输入项，这些数据用于构建 Flow Entity
  name: string;
  repoOrigin: string;
  repoId: number;
  triggerPush: string[] = [];
  platform: string;
  version: string;
  currentPlugins: Plugin[] = [];
  needEnv: string[] = [];

  plugins: string[] = [];

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
      this.currentPlugins.push(plugin);
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

  /**
   * 处理已选择的出发分支
   * @param {boolean} checked
   * @param {string} branch
   */
  handleCheckedBranch(checked: boolean, branch: string): void {
    if (checked) {
      this.triggerPush.push(branch);
    } else {
      const index: number = this.triggerPush.indexOf(branch);
      const frontBranches: string[] = this.triggerPush.slice(0, index);
      const backBranches: string[] = this.triggerPush.slice(index + 1, this.triggerPush.length);
      this.triggerPush = frontBranches.concat(backBranches);
    }
  }

  /**
   * 清空已选择的出发分支
   */
  clearCheckedBranch(): void {
    this.triggerPush = [];
  }

  updatePluginEnv(envName: string, envValue: string): void {
    for (const tempPluginEnv of this.needEnv) {
      if (tempPluginEnv.split('===')[0] === envName) {
        const index: number = this.needEnv.indexOf(tempPluginEnv);
        const frontPluginEnv: string[] = this.needEnv.slice(0, index);
        const backPluginEnv: string[] = this.needEnv.slice(index + 1, this.needEnv.length);
        this.needEnv = frontPluginEnv.concat(backPluginEnv);
        break;
      }
    }
    const pluginEnv: string = envName + '===' + envValue;
    this.needEnv.push(pluginEnv);
  }

  createFlow(): void {
    this.plugins = [];
    for (const plugin of this.currentPlugins) {
      this.plugins.push(plugin.scriptName);
    }
    const createFlowRequest: CreateFlowRequest = new CreateFlowRequest(
      this.name,
      JSON.parse(localStorage.getItem(AppGlobalField.loginResponse)).user.email,
      this.repoOrigin,
      this.repoId,
      this.platform,
      this.version,
      this.triggerPush,
      this.plugins,
      this.needEnv
    );

    // console.log(createFlowRequest.name);
    // console.log(createFlowRequest.userEmail);
    // console.log(createFlowRequest.repoOrigin);
    // console.log(createFlowRequest.repoId);
    // console.log(createFlowRequest.platform);
    // console.log(createFlowRequest.version);
    // console.log(createFlowRequest.triggerPush);
    // console.log(createFlowRequest.plugins);
    // console.log(createFlowRequest.needEnv);

    console.log(createFlowRequest);
  }

}
