export class AccomoationServiceRequest {
    constructor(
        public name: string,
        public description: string,
        public unitValue: number,
        public destinationId: number,
        public startDate: string,
        public endDate: string,
        public supplierId: string,
        public accommodationTypeId: number,
        public capacity: number
    ){}
}
