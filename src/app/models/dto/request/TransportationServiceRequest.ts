export class TransportationServiceRequest {
    constructor(
        public name: string,
        public description: string,
        public unitValue: number,
        public destinationId: number,
        public startDate: string,
        public endDate: string,
        public supplierId: string,
        public transportTypeId: number,
        public company: string,
        public originId: number,
    ) {
    }
}
