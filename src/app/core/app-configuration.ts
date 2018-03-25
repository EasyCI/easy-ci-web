export class AppConfiguration {
  static backendHost = 'http://localhost:8080';
  static userRegisterUrl = AppConfiguration.backendHost + '/user/register';
  static userLoginUrl = AppConfiguration.backendHost + '/user/login';
  static userChangePasswordUrl = AppConfiguration.backendHost + '/user/change_password';
}
