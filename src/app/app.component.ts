import { Component } from '@angular/core';
import { ItemsService } from './services/items.service';
import { HttpClient } from '@angular/common/http';

declare var Chrome: typeof chrome;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-scss-boilerplate';

  constructor(private http: HttpClient) {
    this.wait(15).then(() => { 
      this.http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe((res) => {
        console.log(res);
      });
    });
  }

  wait(sec: number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, sec * 1000);
    });
  }

}
