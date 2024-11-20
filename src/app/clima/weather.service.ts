import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly apiKey = environment.weatherToken; 
  private readonly baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  private getCorsProxiedUrl(url: string): string {
    return `https://thingproxy.freeboard.io/fetch/${url}`;
  }

  getWeatherByLatLong(lat: any, long: any): Observable<any> {
    const url = `${this.baseUrl}?lat=${lat}&lon=${long}&APPID=${this.apiKey}`;
    console.log(url);
    const proxiedUrl = this.getCorsProxiedUrl(url);

    return new Observable((observer) => {
      this.http.get(proxiedUrl).subscribe(
        (response) => {
          observer.next(response);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
}