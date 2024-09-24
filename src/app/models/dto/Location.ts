// location-.model.ts

export class Location {
    public id: number;
    public address: string;
    public latitude: number;
    public longitude: number;
    public country: string;
    public city: string;
    public municipality: string;

    constructor(
        id: number,
        address: string,
        latitude: number,
        longitude: number,
        country: string,
        city: string,
        municipality: string
    ) {
        this.id = id;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.country = country;
        this.city = city;
        this.municipality = municipality;
    }
}
