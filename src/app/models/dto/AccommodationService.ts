import { Service } from "./Service";

export class AccommodationService {
    public service: Service;
    public accommodationTypeId: number;
    public accommodationType: string;
    public capacity: number;

    constructor(
        service: Service,
        accommodationTypeId: number,
        accommodationType: string,
        capacity: number
    ) {
        this.service = service;
        this.accommodationTypeId = accommodationTypeId;
        this.accommodationType = accommodationType;
        this.capacity = capacity;
    }
}
