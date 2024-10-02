import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { GET_SERVICES_BY_KEYWORD } from '../../graphql/queries.graphql';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from '../../backEndServices/servicio-service.service';
import { SuperService } from '../../model/SuperService';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  
  @Input() keyword: string = '';
  @Output() resultsEmitter = new EventEmitter<any[]>();
  services: SuperService[] = [];
  loading: boolean = false;
  error: any;
  private querySubscription: Subscription | undefined;

  selectedFilter: string = ''; // Inicializar el filtro seleccionado como vacío
  showFilters: boolean = false; // Controla la visibilidad del dropdown

  constructor(private readonly apollo: Apollo,
              private servicioService: ServicioService,
              private router: Router,  
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;  
  }

  onFilterChange(): void {
    console.log('Filtro seleccionado:', this.selectedFilter);
    this.servicioService.findAllByType(this.selectedFilter).subscribe(
      data => {
        console.log(data);
        this.services = data
      },
      error => {
        console.error('Error fetching locations:', error);
      }
    );
  }

  verServicio(item: SuperService) {
    console.log(item);
    this.router.navigate([`ver-servicio/${item.id}`]);
  }

  onSearch(): void {
    if (this.keyword.trim()) {
      this.loading = true;
      this.querySubscription = this.apollo
        .watchQuery<any>({
          query: GET_SERVICES_BY_KEYWORD,
          variables: {
            keyword: this.keyword,
            filter: this.selectedFilter // Pasar el filtro seleccionado a la consulta
          },
        })
        .valueChanges.subscribe({
          next: ({ data, loading }) => {
            this.loading = loading;
            this.services = data?.servicesByKeyword || [];
            this.error = null;
            this.resultsEmitter.emit(this.services); // Emitir los resultados
            console.log(this.services);
            this.services.forEach(element => {
              console.log(element.serviceType);
              
            });
          },
          error: (err) => {
            this.error = err;
            this.loading = false;
            this.services = [];
            console.error('Error en la búsqueda', err);
          }
        });
    } else {
      this.services = [];
    }
  }

  ngOnDestroy(): void {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}
