import {User} from '../user';
import {BaseEntity} from '../base';

export class LoginResponse extends BaseEntity {
  userToken: string;
  user: User;
}
