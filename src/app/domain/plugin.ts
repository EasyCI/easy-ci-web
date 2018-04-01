import {PluginEnv} from './plugin-env';

export class Plugin {
  scriptName: string;
  fullName: string;
  description: string;
  needEnv: PluginEnv[];
}
