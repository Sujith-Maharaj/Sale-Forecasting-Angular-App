import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface SalesForecast {
  Date: string;
  Price: number;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})


export class MainComponent {

  constructor(private http: HttpClient, public router: Router) {}

  selectedfile: File;
  forecastType: string = 'monthly';
  periodicity: number = 12;
  arimaForecast: SalesForecast[];
  sarimaForecast: SalesForecast[];
  showImage = false;
  imageSource = "forecast.png"


  onFileSelected(event: any): void {
    this.selectedfile = event.target.files[0];
  }

  onForecast() {
    const formData = new FormData();
    formData.append('file', this.selectedfile);
    formData.append('forecastType', this.forecastType);
    formData.append('periodicity', this.periodicity.toString());

    this.http.post<any>('http://127.0.0.1:5000/predict', formData).subscribe(
      (response) => {
        this.arimaForecast = response.arima_forecast.map((value: number, index: number) => {
          const date = new Date();
          date.setMonth(date.getMonth() + index);
          return { Date: date.toISOString().substr(0, 7), Price: value };
        });
        this.sarimaForecast = response.sarima_forecast.map((value: number, index: number) => {
          const date = new Date();
          date.setMonth(date.getMonth() + index);
          return { Date: date.toISOString().substr(0, 7), Price: value };
        });
      },
      (error) => {
        console.log(error);
      }
    );
    this.showImage= true;
  }


  viewImage(){
    this.router.navigate(['view'])
  }

}
