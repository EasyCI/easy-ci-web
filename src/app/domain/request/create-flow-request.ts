export class CreateFlowRequest {
  name: string;
  userEmail: string;
  repoOrigin: string;
  repoId: number;
  platform: string;
  version: string;
  triggerPush: string[];
  plugins: string[];
  needEnv: string[];

  constructor(name: string, userEmail: string, repoOrigin: string, repoId: number, platform: string, version: string, triggerPush: string[], plugins: string[], needEnv: string[]) {
    this.name = name;
    this.userEmail = userEmail;
    this.repoOrigin = repoOrigin;
    this.repoId = repoId;
    this.platform = platform;
    this.version = version;
    this.triggerPush = triggerPush;
    this.plugins = plugins;
    this.needEnv = needEnv;
  }
}
