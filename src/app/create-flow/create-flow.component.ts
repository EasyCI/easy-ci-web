import {Component, OnInit} from '@angular/core';
import {GithubAccountResponse} from '../domain/response/github-account-response';
import {AppGlobalField} from '../core/app-global-field';

@Component({
  selector: 'app-create-flow',
  templateUrl: './create-flow.component.html',
  styleUrls: ['./create-flow.component.css']
})
export class CreateFlowComponent implements OnInit {

  githubAccountResponse: GithubAccountResponse;

  constructor() {
  }

  ngOnInit() {
    if (localStorage.getItem(AppGlobalField.githubAccountResponse) != null) {
      this.githubAccountResponse = JSON.parse(localStorage.getItem(AppGlobalField.githubAccountResponse));
    }
  }
}
