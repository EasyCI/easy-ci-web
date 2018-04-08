export class GithubHookRequest {
  ref: string;
  isManual: boolean;
  triggerBranch: string;

  constructor(ref: string, isManual: boolean, triggerBranch: string) {
    this.ref = ref;
    this.isManual = isManual;
    this.triggerBranch = triggerBranch;
  }
}
