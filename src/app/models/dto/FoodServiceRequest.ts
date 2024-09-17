import { Service } from "./Service";

export class FoodServiceResponse {
    public serviceResponse: Service;
    public foodTypeId: number;
    public foodType: string;

    constructor(
        serviceResponse: Service,
        foodTypeId: number,
        foodType: string
    ) {
        this.serviceResponse = serviceResponse;
        this.foodTypeId = foodTypeId;
        this.foodType = foodType;
    }
}
