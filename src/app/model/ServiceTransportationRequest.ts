import { LocationResponse } from "./LocationResponse";
import { TransportTypeResponse } from "./TransportTypeResponse";

export class ServiceTransportationRequest {
    id: number | null;
    name: string;
    description: string;
    unitValue: number;
    destination: LocationResponse;
    startDate: string;
    endDate: string; 
    supplierId: string;
    transportType: TransportTypeResponse;
    company: string;
    origin: LocationResponse;

    constructor(
        id: number | null,
        name: string,
        description: string,
        unitValue: number,
        destination: LocationResponse,
        startDate: string,
        endDate: string,
        supplierId: string,
        transportType: TransportTypeResponse,
        company: string,
        origin: LocationResponse
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.unitValue = unitValue;
        this.destination = destination;
        this.startDate = startDate;
        this.endDate = endDate;
        this.supplierId = supplierId;
        this.transportType = transportType;
        this.company = company;
        this.origin = origin;
    }
}
