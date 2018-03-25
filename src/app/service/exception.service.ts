import {Injectable} from '@angular/core';

@Injectable()
export class ExceptionService {

  constructor() {
  }

  /**
   * 统一处理未知错误
   * @param e
   */
  handleError(e): void {
    console.log(e);
  }
}
