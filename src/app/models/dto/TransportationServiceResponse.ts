// Importación de tipos si es necesario
// import { ServiceResponse } from './path/to/ServiceResponse';

import { ServiceResponse } from "./ServiceResponse";

export class TransportationServiceResponse {
    public serviceResponse: ServiceResponse;
    public originId: number;
    public originCountry: string;
    public originCity: string;
    public transportTypeId: number;
    public transportType: string;
    public company: string;

    constructor(
        serviceResponse: ServiceResponse,
        originId: number,
        originCountry: string,
        originCity: string,
        transportTypeId: number,
        transportType: string,
        company: string
    ) {
        this.serviceResponse = serviceResponse;
        this.originId = originId;
        this.originCountry = originCountry;
        this.originCity = originCity;
        this.transportTypeId = transportTypeId;
        this.transportType = transportType;
        this.company = company;
    }
}
