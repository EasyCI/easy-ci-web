import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class CommonService {

  constructor(private router: Router) {
  }

  jumpTo(url: string): void {
    this.router.navigateByUrl(url);
  }
}
