import { ServiceResponse } from "../ServiceResponse";

export class AccommodationServiceResponse {
    public serviceResponse: ServiceResponse;
    public accommodationTypeId: number;
    public accommodationType: string;
    public capacity: number;

    constructor(
        serviceResponse: ServiceResponse,
        accommodationTypeId: number,
        accommodationType: string,
        capacity: number
    ) {
        this.serviceResponse = serviceResponse;
        this.accommodationTypeId = accommodationTypeId;
        this.accommodationType = accommodationType;
        this.capacity = capacity;
    }
}
