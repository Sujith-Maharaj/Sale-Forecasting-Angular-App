import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  public forecastSales(file: File, forecastType: string, periodicity: number): Observable<any>{
    const formData = new FormData();
    formData.append('file', file);
    formData.append('forecast_type', forecastType);
    formData.append('periodicity', periodicity.toString());

    return this.http.post<any>(`${this.baseUrl}/predict`, formData);
  }
}
