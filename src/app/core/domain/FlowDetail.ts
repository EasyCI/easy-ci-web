import {Flow} from './flow';

export class FlowDetail {
  flow: Flow;
  historySum: number;
  successSum: number;
  failureSum: number;
  rating: number;
  lastBuildTime: string;
}
