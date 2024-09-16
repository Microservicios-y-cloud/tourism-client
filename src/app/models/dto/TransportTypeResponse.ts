// food-type-response.ts
export class TransportTypeResponse {
    public TransportTypeId: number;
    public name: string;

    constructor(TransportTypeId: number, name: string) {
        this.TransportTypeId = TransportTypeId;
        this.name = name;
    }
}
