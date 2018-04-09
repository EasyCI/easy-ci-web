import {BaseEntity} from '../base';

export class CommonOkResponse extends BaseEntity {
  code: number;
  status: string;
}
