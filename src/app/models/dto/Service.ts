export class Service {
    constructor(
        public name: string,
        public description: string,
        public unitValue: number,
        public destinationId: number,
        public startDate: Date,
        public endDate: Date,
        public supplierId: string
    ) {}
}
