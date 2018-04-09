import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

import {GithubAccountResponse} from '../core/domain/response/github-account-response';
import {AppGlobalField} from '../core/app-global-field';
import {FlowService} from '../core/service/flow.service';
import {ExceptionService} from '../core/service/exception.service';
import {PluginsResponse} from '../core/domain/response/plugins-response';
import {Plugin} from '../core/domain/plugin';
import {Flow} from '../core/domain/flow';
import {CommonService} from '../core/service/common.service';
import {ReposService} from '../core/service/repos.service';

@Component({
  selector: 'app-create-flow',
  templateUrl: './create-flow.component.html',
  styleUrls: ['./create-flow.component.css']
})
export class CreateFlowComponent implements OnInit {

  showMessage: string;
  creatingMessage: string;
  updateGithubMessage: string;
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
              private exceptionService: ExceptionService,
              private commonService: CommonService,
              private location: Location,
              private reposService: ReposService) {
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
   * 处理从服务器获得的 Plugin 列表数据
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
   * 创建 Flow
   */
  createFlow(): void {
    this.creatingMessage = null;

    // Plugin[] 转换 string[]
    this.plugins = [];
    for (const plugin of this.currentPlugins) {
      this.plugins.push(plugin.scriptName);
    }

    if (this.name != null && this.name.length !== 0 &&
      this.repoOrigin != null &&
      this.repoId != null &&
      this.platform != null &&
      this.version != null) {
      // 必填项都填好了
      this.creatingMessage = '【 Flow 创建中…… 】 此过程较慢，请耐心等待 O(∩_∩)O';

      const flow: Flow = new Flow(
        null,
        this.name,
        JSON.parse(localStorage.getItem(AppGlobalField.loginResponse)).user.email,
        this.repoOrigin,
        this.repoId,
        null,
        this.platform,
        this.version,
        this.triggerPush,
        this.plugins,
        this.needEnv
      );
      this.flowService.create(flow)
        .subscribe(result => this.handleCreateFlow(result));
    } else {
      // 还有必填项没有填写
      this.creatingMessage = '请检查是否存在未填写完整的项目';
    }

  }

  /**
   * 处理创建 Flow
   * @param {Flow} flow
   */
  handleCreateFlow(flow: Flow): void {
    if (flow.id != null) {
      this.creatingMessage = '【 创建成功！ 】';
      setTimeout(() => this.jumpTo('/flow/' + flow.name), 1000);
    } else if (flow.error != null) {
      this.creatingMessage = '【创建 Flow 遇到错误】' + flow.message;
    } else {
      this.exceptionService.handleError(flow);
    }
  }

  /**
   * 更新 GibHub 仓库列表
   */
  updateGithubAccount(): void {
    this.updateGithubMessage = '【 正在更新…… 】 此过程较慢，请耐心等待 O(∩_∩)O';
    this.reposService.updateGithubAccount()
      .subscribe(result => this.handleUpdateGithubAccount(result));
  }

  /**
   * 处理更新 GitHub 仓库列表的操作
   * @param {GithubAccountResponse} githubAccountResponse
   */
  handleUpdateGithubAccount(githubAccountResponse: GithubAccountResponse): void {
    if (githubAccountResponse.githubAccount.login != null) {
      localStorage.setItem(AppGlobalField.githubAccountResponse, JSON.stringify(githubAccountResponse));
      this.githubAccountResponse = githubAccountResponse;
      this.updateGithubMessage = '【 更新完成！ 】';
    } else if (githubAccountResponse.error != null) {
      this.updateGithubMessage = '【更新仓库列表遇到问题】' + githubAccountResponse.message;
    } else {
      this.exceptionService.handleError(githubAccountResponse);
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
  updateCheckedBranch(checked: boolean, branch: string): void {
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
   * 清空已选择的触发分支
   */
  clearCheckedBranch(): void {
    this.triggerPush = [];
  }

  /**
   * 处理插件环境变量输入内容
   * @param {string} envName
   * @param {string} envValue
   */
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

  goBack(): void {
    this.location.back();
  }

  jumpTo(url: string): void {
    this.commonService.jumpTo(url);
  }
}
