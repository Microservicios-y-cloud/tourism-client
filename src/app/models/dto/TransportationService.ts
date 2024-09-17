// Importación de tipos si es necesario
// import { Service } from './path/to/Service';

import { Service } from "./Service";

export class TransportationService {
    public service: Service;
    public originId: number;
    public originCountry: string;
    public originCity: string;
    public transportTypeId: number;
    public transportType: string;
    public company: string;

    constructor(
        service: Service,
        originId: number,
        originCountry: string,
        originCity: string,
        transportTypeId: number,
        transportType: string,
        company: string
    ) {
        this.service = service;
        this.originId = originId;
        this.originCountry = originCountry;
        this.originCity = originCity;
        this.transportTypeId = transportTypeId;
        this.transportType = transportType;
        this.company = company;
    }
}
