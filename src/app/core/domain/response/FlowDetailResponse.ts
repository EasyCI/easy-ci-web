import {FlowDetail} from '../FlowDetail';
import {BaseEntity} from '../base';

export class FlowDetailResponse extends BaseEntity {
  flowDetails: FlowDetail[];
}
