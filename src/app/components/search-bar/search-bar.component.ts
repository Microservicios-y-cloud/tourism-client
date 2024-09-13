import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { GET_SERVICES_BY_KEYWORD } from '../../graphql/queries.graphql';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {

  @Input()
  keyword: string = '';
  services: any[] = [];
  loading: boolean = false;
  error: any;
  private querySubscription: Subscription | undefined;
searchTerm: any;


  constructor(private readonly apollo: Apollo) {}

  ngOnInit() {
    // Inicialmente, no hacemos ninguna consulta hasta que el usuario ingrese un término de búsqueda.
  }

  onSearch(): void {
    if (this.keyword.trim()) {
      this.loading = true;
      this.querySubscription = this.apollo
        .watchQuery<any>({
          query: GET_SERVICES_BY_KEYWORD,
          variables: {
            keyword: "servicio" //TODO modificar para que sea la keyword que el usuario quiera
          },
        })
        .valueChanges.subscribe({
          next: ({ data, loading }) => {
            this.loading = loading;
            this.services = data?.servicesByKeyword || [];
            this.error = null;
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

  showFilters: boolean = false;  

  toggleFilters(): void {
    this.showFilters = !this.showFilters;  
  }
}
