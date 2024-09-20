import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'app-pagina-error',
  templateUrl: './pagina-error.component.html',
  styleUrl: './pagina-error.component.css'
})
export class PaginaErrorComponent implements OnInit {
  errorMessage: string | undefined;

  constructor(private errorService: ErrorService) {}

  ngOnInit(): void {
    this.errorMessage = this.errorService.getErrorMessage() || 'Ha ocurrido un error inesperado';
  }

}
