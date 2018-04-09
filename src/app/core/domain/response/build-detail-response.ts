import {BuildDetail} from '../build-detail';
import {BaseEntity} from '../base';

export class BuildDetailResponse extends BaseEntity {
  buildDetails: BuildDetail[];
}
