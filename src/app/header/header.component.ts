import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  username: string = '';
  userData: any;

  constructor (private router: Router) {}

  ngOnInit() {
    const jsonString = localStorage.getItem('userData');
    if (jsonString) {
      this.userData = JSON.parse(jsonString);
    } else {
      console.log("ERROR: could not get data from local storage");
    }
    this.username = this.userData.username;
  }

  logout() {
    localStorage.removeItem('userData');
    localStorage.removeItem('disciplineId');
    localStorage.removeItem('testToLoad');
    this.router.navigate(['/login']);
  }

}
