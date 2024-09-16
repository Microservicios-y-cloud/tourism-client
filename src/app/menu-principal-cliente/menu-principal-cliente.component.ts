import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ServicioService } from '../services/servicio-service.service';
import { ServiceResponse } from '../models/dto/ServiceResponse';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { ActivatedRoute, Router } from '@angular/router';

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

  public cartas: ServiceResponse[] = [];

  @ViewChild(SearchBarComponent) searchBarComponent!: SearchBarComponent;
  servicios: ServiceResponse[] = [];

  constructor(private servicioService: ServicioService,
    private router: Router,  private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //this.servicioService.findAll().subscribe(servicios => this.servicios = servicios);
  }

  ngAfterViewInit(): void {
    this.searchBarComponent.resultsEmitter.subscribe(results => {
        console.log('Resultados recibidos en el menú principal:', results);

        this.cartas = results.map(({
            id,name, description, unitValue, country, city, createdBy, destinationId, startDate, endDate 
        }) => new ServiceResponse(
            id,name, description, unitValue, country, city, createdBy, destinationId, 
            startDate,
            endDate
        ));
        console.log(this.cartas);
    });
}


  verServicio(item:ServiceResponse) {
    this.router.navigate([`ver-servicio/${item.id}`]);
  }
}
