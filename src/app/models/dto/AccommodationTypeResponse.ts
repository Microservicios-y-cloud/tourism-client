// food-type-response.ts
export class AccommodationTypeResponse {
    public AccommodationTypeId: number;
    public name: string;

    constructor(AccommodationTypeId: number, name: string) {
        this.AccommodationTypeId = AccommodationTypeId;
        this.name = name;
    }
}
