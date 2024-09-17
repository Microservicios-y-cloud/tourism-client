export class AccommodationType {
    public AccommodationTypeId: number;
    public name: string;

    constructor(AccommodationTypeId: number, name: string) {
        this.AccommodationTypeId = AccommodationTypeId;
        this.name = name;
    }
}