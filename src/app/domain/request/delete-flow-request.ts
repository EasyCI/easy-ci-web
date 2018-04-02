export class DeleteFlowRequest {
  flowId: string;
  hookId: number;
  repoId: number;

  constructor(flowId: string, hookId: number, repoId: number) {
    this.flowId = flowId;
    this.hookId = hookId;
    this.repoId = repoId;
  }
}
