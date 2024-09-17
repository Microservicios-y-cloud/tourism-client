import { Service } from "./Service";

export class FoodService {
    public service: Service;
    public foodTypeId: number;
    public foodType: string;

    constructor(
        service: Service,
        foodTypeId: number,
        foodType: string
    ) {
        this.service = service;
        this.foodTypeId = foodTypeId;
        this.foodType = foodType;
    }
}
