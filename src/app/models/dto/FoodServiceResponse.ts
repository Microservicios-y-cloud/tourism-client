import { ServiceResponse } from "../ServiceResponse";

export class FoodServiceResponse {
    public serviceResponse: ServiceResponse;
    public foodTypeId: number;
    public foodType: string;

    constructor(
        serviceResponse: ServiceResponse,
        foodTypeId: number,
        foodType: string
    ) {
        this.serviceResponse = serviceResponse;
        this.foodTypeId = foodTypeId;
        this.foodType = foodType;
    }
}
