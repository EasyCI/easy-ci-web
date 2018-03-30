import {GithubAccount} from '../github-account';
import {GithubRepo} from '../github-repo';
import {BaseEntity} from '../base';

export class GithubAccountResponse extends BaseEntity{
  githubAccount: GithubAccount;
  githubRepos: GithubRepo[];
}
