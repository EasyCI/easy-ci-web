import {BaseEntity} from './base';

export class GithubAccount extends BaseEntity {
  login: string;
  accessToken: string;
  avatarUrl: string;
  authorizeTo: string;
}
