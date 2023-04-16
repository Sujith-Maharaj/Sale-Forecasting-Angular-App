import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})

export class MainpageComponent {

  file!: File;
  forecastType!: string;
  periodicity!: number;
  forecastData: any;
  arimaPlotUrl!: string;
  sarimaPlotUrl!: string;
  loading!: boolean;
  error!: string;
  selectedFileName: string = "";


  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    const fileInput = event.target as HTMLInputElement;
    const selectedFile = fileInput.files?.[0];

    if (selectedFile) {
      this.selectedFileName = selectedFile.name;
    } else {
      this.selectedFileName = "";
    }
  }




  onSubmit() {
    this.loading = true;
    this.error = "";


    // Create form data to send file, forecast_type, and periodicity
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('forecast_type', this.forecastType);
    formData.append('periodicity', this.periodicity.toString());

    // Set headers for file upload
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    // Make POST request to Flask endpoint
    this.http.post<any>('http://127.0.0.1:5000/predict', formData, { headers }).subscribe(
      data => {
        this.forecastData = data;
        this.arimaPlotUrl = URL.createObjectURL(data.arima_plot);
        this.sarimaPlotUrl = URL.createObjectURL(data.sarima_plot);
        this.loading = false;
      },
      error => {
        this.error = error.message;
        this.loading = false;
      }
    );
  }

}
