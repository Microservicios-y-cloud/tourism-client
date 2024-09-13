import { gql } from "apollo-angular";

const GET_SERVICES_BY_KEYWORD = gql`
  query ServicesByKeyword($keyword: String!) {
    servicesByKeyword(keyword: $keyword) {
      id
      name
      description
      unitValue
      destinationId
      country
      city
      startDate
      endDate
      createdBy
    }
  }
`;

export { GET_SERVICES_BY_KEYWORD };