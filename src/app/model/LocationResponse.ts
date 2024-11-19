export class LocationResponse {
    id?: number; 
    address?: string;
    latitude?: number;
    longitude?: number; 
    country?: string;
    city?: string;
    municipality?: string;

    constructor(address?: string, latitude?: number, longitude?: number, country?: string, city?: string, municipality?: string) {
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.country = country;
        this.city = city;
        this.municipality = municipality;
    }
}
