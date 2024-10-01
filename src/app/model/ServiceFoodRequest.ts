import { FoodTypeResponse } from "./FoodTypeResponse";
import { LocationResponse } from "./LocationResponse";

export class ServiceFoodRequest {
    id: number | null;
    name: string;
    description: string;
    unitValue: number;
    destination: LocationResponse;
    startDate: string;
    endDate: string; 
    supplierId: string;
    foodType: FoodTypeResponse;
  
    constructor(
      id: number | null,
      name: string,
      description: string,
      unitValue: number,
      destination: LocationResponse,
      startDate: string,
      endDate: string,
      supplierId: string,
      foodType: FoodTypeResponse
    ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.unitValue = unitValue;
      this.destination = destination;
      this.startDate = startDate;
      this.endDate = endDate;
      this.supplierId = supplierId;
      this.foodType = foodType;
    }
  }
  