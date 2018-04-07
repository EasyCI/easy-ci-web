export class AppConfiguration {
  // Back End Host Address
  static backendHost = 'http://6629e695.ngrok.io';
  // RESTful API (user/*)
  static userRegisterUrl = AppConfiguration.backendHost + '/user/register';
  static userLoginUrl = AppConfiguration.backendHost + '/user/login';
  static userChangePasswordUrl = AppConfiguration.backendHost + '/user/change_password';
  // RESTful API (repos/*)
  static reposGetGithubAuthUrl = AppConfiguration.backendHost + '/repos/get_github_auth_url';
  static reposGetGithubAccount = AppConfiguration.backendHost + '/repos/get_github_account';
  static reposUpdateGithubAccount = AppConfiguration.backendHost + '/repos/update_github_account';
  // RESTful API (flow/*)
  static flowGetPlugins = AppConfiguration.backendHost + '/flow/get_plugins';
  static flowCreate = AppConfiguration.backendHost + '/flow/create';
  static flowEdit = AppConfiguration.backendHost + '/flow/edit';
  static flowGetAll = AppConfiguration.backendHost + '/flow/get_all';
  static flowDelete = AppConfiguration.backendHost + '/flow/delete';
}
