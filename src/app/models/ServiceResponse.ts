export class ServiceResponse {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public unitValue: number,
        public country: string,
        public city: string,
        public createdBy: string,
        public destinationId?: number,
        public startDate?: Date,
        public endDate?: Date
    ) {}
}
