import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Flow} from '../domain/flow';
import {AppGlobalField} from '../core/app-global-field';

@Component({
  selector: 'app-flow-tasks',
  templateUrl: './flow-tasks.component.html',
  styleUrls: ['./flow-tasks.component.css']
})
export class FlowTasksComponent implements OnInit {

  flow: Flow;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getCurrentFlow();
  }

  /**
   * 通过路由中的 flowId 得到当前选中的 Flow 信息
   */
  getCurrentFlow(): void {
    const flowId: string = this.route.snapshot.paramMap.get('flowId');
    for (const tempFlow of JSON.parse(localStorage.getItem(AppGlobalField.flows))) {
      if (tempFlow.id === flowId) {
        this.flow = tempFlow;
        break;
      }
    }
  }
}
