import { AccommodationTypeResponse } from "./AccommodationTypeResponse";
import { LocationResponse } from "./LocationResponse";

export class ServiceAccommodationRequest {
    id: number | null;
    name: string;
    description: string;
    unitValue: number;
    destination: LocationResponse;
    startDate: string;
    endDate: string; 
    supplierId: string;
    accommodationType: AccommodationTypeResponse;
    capacity: number;

    constructor(
        id: number | null,
        name: string,
        description: string,
        unitValue: number,
        destination: LocationResponse,
        startDate: string,
        endDate: string,
        supplierId: string,
        accommodationType: AccommodationTypeResponse,
        capacity: number
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.unitValue = unitValue;
        this.destination = destination;
        this.startDate = startDate;
        this.endDate = endDate;
        this.supplierId = supplierId;
        this.accommodationType = accommodationType;
        this.capacity = capacity;
    }
}
