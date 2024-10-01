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

  @ViewChild(SearchBarComponent) searchBarComponent!: SearchBarComponent;
  servicios: SuperService[] = [];

  constructor(private servicioService: ServicioService,
    private router: Router,  private route: ActivatedRoute
  ) { }

  public serviciosAll: SuperService[] = []

  ngOnInit(): void {
    this.servicioService.findAll().subscribe(
      data => {
        this.serviciosAll = data;
        console.log(this.serviciosAll); 
      },
      error => {
        console.error('Error fetching services:', error);
      }
    );
  }
  

  ngAfterViewInit(): void {

  }


  verServicio(item: SuperService) {
    console.log(item);
    
    this.router.navigate([`ver-servicio/${item.id}`]);
  }
}
