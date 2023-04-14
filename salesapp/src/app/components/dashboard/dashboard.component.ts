import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ForecastService } from 'src/app/services/forecast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent {
  forecastType: string = 'monthly';
  filename: string ="";
  periodicity: number = 10;
  forecastedData: any;
  arimaForecast: any;
  sarimaForecast: any;
  filetoupload!: File;
  fileToUpload: File | null = null;


  constructor(private forecastservice: ForecastService) { }

  onfilechange(event: any){
    this.filetoupload = event.target.files[0];
    this.filename = this.filetoupload ? this.filetoupload.name : "";
  }

  onSubmit(forecastForm: NgForm): void{
    if(this.fileToUpload){
      this.forecastservice.forecastSales(this.fileToUpload, this.forecastType, this.periodicity)
      .subscribe(
        (data: any) => {
          this.forecastedData = data;
          this.arimaForecast = data.arima_forecast;
          this.sarimaForecast = data.sarima_forecast;
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }


}