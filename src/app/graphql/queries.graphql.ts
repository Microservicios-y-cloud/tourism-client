import { gql } from "apollo-angular";

const GET_SERVICES_BY_KEYWORD = gql`
  query ServicesByKeyword($keyword: String!) {
    servicesByKeyword(keyword: $keyword) {
      id
      createdBy
      destination {
        id
        address
        latitude
        longitude
        country
        city
        municipality
      }
      name
      description
      unitValue
      startDate
      endDate
    }
  }
`;

export { GET_SERVICES_BY_KEYWORD };