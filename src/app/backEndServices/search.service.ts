import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

export interface ServiceResponse {
  id: string;
  name: string;
  description: string;
  unitValue: number;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private apollo: Apollo) {}

  search(keyword: string): Observable<{ data: { servicesByKeyword: ServiceResponse[] } }> {
    return this.apollo.query({
      query: gql`
        query($keyword: String!) {
          servicesByKeyword(keyword: $keyword) {
            id
            name
            description
            unitValue
          }
        }
      `,
      variables: {
        keyword: keyword
      }
    });
  }
}
