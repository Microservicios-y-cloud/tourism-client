import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private errorMessage: string | undefined;

  setErrorMessage(message: string) {
    this.errorMessage = message;
  }

  getErrorMessage(): string | undefined {
    return this.errorMessage;
  }
}
