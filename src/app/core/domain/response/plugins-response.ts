import {BaseEntity} from '../base';
import {Plugin} from '../plugin';

export class PluginsResponse extends BaseEntity {
  plugins: Plugin[];
}
