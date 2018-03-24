import {BaseEntity} from './base';

export class User extends BaseEntity{
  email: string;
  username: string;
  password: string;

  constructor(email: string, username: string, password: string) {
    super();
    this.email = email;
    this.username = username;
    this.password = password;
  }
}
