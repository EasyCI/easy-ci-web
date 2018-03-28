export class AppConfiguration {
  // 后端服务主机地址
  static backendHost = 'http://localhost:8080';
  // RESTful API (user/*)
  static userRegisterUrl = AppConfiguration.backendHost + '/user/register';
  static userLoginUrl = AppConfiguration.backendHost + '/user/login';
  static userChangePasswordUrl = AppConfiguration.backendHost + '/user/change_password';
  static userGetGithubAccount = AppConfiguration.backendHost + '/user/get_github_account';
  // RESTful API (github/*)
  static githubGetAccessToken = AppConfiguration.backendHost + '/github/get_access_token';
  static githubUpdateAccount = AppConfiguration.backendHost + '/github/update_account';
  // RESTful API (flow/*)
  static flowGetPlugins = AppConfiguration.backendHost + '/flow/get_plugins';
  static flowCreate = AppConfiguration.backendHost + '/flow/create';
  static flowEdit = AppConfiguration.backendHost + '/flow/edit';
  static flowGetAll = AppConfiguration.backendHost + '/flow/get_all';
  static flowDelete = AppConfiguration.backendHost + '/flow/delete';
}
