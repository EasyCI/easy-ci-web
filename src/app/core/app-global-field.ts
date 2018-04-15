export class AppGlobalField {
  // localStrong 字段名
  static loginResponse = 'LoginResponse';
  static flows = 'Flows';
  static githubAccountResponse = 'GithubAccountResponse';
  static pluginsResponse = 'PluginsResponse';
  static buildDetailResponse = 'BuildDetailResponse';
  static flowDetailResponse = 'FlowDetailResponse';

  // flow-tasks 及 task-detail 页面轮寻时间间隔(ms)
  static flowTasksTimeout = 5 * 1000;
  static taskDetailTimeout = 2 * 1000;
}
