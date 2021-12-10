import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dashbord';
  authentication = localStorage.getItem('authentication');
 
  constructor(private router: Router) {
     ;
  }

  hasRoute(route: string) {
        console.log(this.router.url);

    return this.router.url.includes(route);
  }
}
