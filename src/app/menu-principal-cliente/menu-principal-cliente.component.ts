import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ServicioService } from '../backEndServices/servicio-service.service';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperService } from '../model/SuperService';

interface Card {
  name: string;
  description: string;
  unitValue: string;
}

@Component({
  selector: 'app-menu-principal-cliente',
  templateUrl: './menu-principal-cliente.component.html',
  styleUrls: ['./menu-principal-cliente.component.css']
})
export class MenuPrincipalClienteComponent implements OnInit, AfterViewInit {

  public cartas: SuperService[] = [];
  public keyword: string = '';  // Define la propiedad keyword

  @ViewChild(SearchBarComponent) searchBarComponent!: SearchBarComponent;

  constructor(private servicioService: ServicioService,
              private router: Router,  
              private route: ActivatedRoute) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  onResultsReceived(results: SuperService[]): void {
    this.cartas = results;  // Asigna los resultados recibidos a 'cartas'
    console.log('Resultados recibidos:', this.cartas);
  }

  verServicio(item: SuperService) {
    console.log(item);
    this.router.navigate([`ver-servicio/${item.id}`]);
  }
}
