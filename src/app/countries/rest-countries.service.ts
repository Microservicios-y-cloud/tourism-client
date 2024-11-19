import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestCountriesService {
  private readonly apiKey = environment.countriesToken;
  private readonly baseUrl = 'https://api.countrystatecity.in/v1';

  constructor() {}

  private createHeaders(): Headers {
    return new Headers({
      'X-CSCAPI-KEY': this.apiKey,
      'Content-Type': 'application/json',
    });
  }

  private createRequestOptions(): RequestInit {
    return {
      method: 'GET',
      headers: this.createHeaders(),
      redirect: 'follow' as RequestRedirect,
    };
  }

  getCountriesFetch(): Observable<any> {
    return new Observable((observer) => {
      fetch(`${this.baseUrl}/countries`, this.createRequestOptions())
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getStatesFetch(countryIso: string): Observable<any> {
    return new Observable((observer) => {
      fetch(`${this.baseUrl}/countries/${countryIso}/states`, this.createRequestOptions())
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getCitiesFetch(countryIso: string, stateIso: string): Observable<any> {
    return new Observable((observer) => {
      fetch(`${this.baseUrl}/countries/${countryIso}/states/${stateIso}/cities`, this.createRequestOptions())
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
