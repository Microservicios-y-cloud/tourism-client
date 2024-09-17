import { Service } from "../Service";

export class FoodServiceRequest {
    constructor(
        public name: string,
        public description: string,
        public unitValue: number,
        public destinationId: number,
        public startDate: string,
        public endDate: string,
        public supplierId: string,
        public foodTypeId: number
    ) {
    }
}
