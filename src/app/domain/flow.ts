import {BaseEntity} from './base';

export class Flow extends BaseEntity {
  id: string;
  name: string;
  userEmail: string;
  repoId: number;
  hookId: number;
  language: string;
  version: string;
  triggerPush: string[];
  plugins: string[];
  inputs: string[];


  constructor(id: string, name: string, userEmail: string, repoId: number, hookId: number, language: string, version: string,
              triggerPush: string[], plugins: string[], inputs: string[]) {
    super();
    this.id = id;
    this.name = name;
    this.userEmail = userEmail;
    this.repoId = repoId;
    this.hookId = hookId;
    this.language = language;
    this.version = version;
    this.triggerPush = triggerPush;
    this.plugins = plugins;
    this.inputs = inputs;
  }
}
