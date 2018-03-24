import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() {
  }

  title;

  ngOnInit() {
    if (localStorage.getItem('currentUser') == null) {
      this.title = '登入';
    } else {
      this.title = '登出';
    }
  }

}
