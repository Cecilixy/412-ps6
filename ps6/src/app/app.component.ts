import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mockData: any[] = [];
  constructor(private http: HttpClient) {
  }

  getWeather() {
    this.mockData = [];
    this.http.get('../../assets/mock.json').subscribe(data => {
      if (data && !(data instanceof Array)) {
        this.mockData.push(JSON.stringify(data));
        console.log(this.mockData);
      }
    });
  }
}
