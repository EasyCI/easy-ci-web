import {BuildLog} from './build-log';
import {BaseEntity} from './base';

export class BuildDetail extends BaseEntity {
  id: string;
  queueNumber: number;
  flowId: string;
  triggerBranch: string;
  manual: boolean;
  building: boolean;
  success: boolean;
  duration: string;
  platform: string;
  version: string;
  buildLogs: BuildLog[];
  productPreviewUrl: string;
}
