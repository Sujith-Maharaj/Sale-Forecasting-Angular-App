import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'salesapp';

  message: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:5000/index').subscribe((data: any) => {
      this.message = data.message;
    });
  }
}
