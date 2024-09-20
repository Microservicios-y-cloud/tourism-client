import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { GET_SERVICES_BY_KEYWORD } from '../../graphql/queries.graphql';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {

  @Input() keyword: string = '';
  @Output() resultsEmitter = new EventEmitter<any[]>();
  services: any[] = [];
  loading: boolean = false;
  error: any;
  private querySubscription: Subscription | undefined;

  constructor(private readonly apollo: Apollo) {}

  ngOnInit() {}

  onSearch(): void {
    if (this.keyword.trim()) {
      this.loading = true;
      this.querySubscription = this.apollo
        .watchQuery<any>({
          query: GET_SERVICES_BY_KEYWORD,
          variables: {
            keyword: this.keyword,
          },
        })
        .valueChanges.subscribe({
          next: ({ data, loading }) => {
            this.loading = loading;
            this.services = data?.servicesByKeyword || [];
            this.error = null;
            this.resultsEmitter.emit(this.services);  // Emitir los resultados
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
      this.resultsEmitter.emit(this.services);  // Emitir resultados vacíos
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
