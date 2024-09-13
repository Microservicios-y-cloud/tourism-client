// Interfaces para la respuesta de GraphQL
export interface Service {
  id: string;
  name: string;
  description: string;
  unitValue: number;
}

export interface ServicesResult {
  count: number;
  services: Service[];
}