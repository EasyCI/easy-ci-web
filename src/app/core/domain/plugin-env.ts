export class PluginEnv {
  envName: string;
  envValue: string;
  envDescription: string;

  constructor(envName: string, envValue: string, envDescription: string) {
    this.envName = envName;
    this.envValue = envValue;
    this.envDescription = envDescription;
  }
}
