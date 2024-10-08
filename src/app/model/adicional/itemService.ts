export class itemService {
    serviceId: number | null;
    serviceName: string;
    unitValue: number;
    quantity: number;
    subtotal: number;

    constructor(
        serviceId: number,
        serviceName: string,
        unitValue: number,
        quantity: number,
        subtotal: number
    ) {
        this.serviceId = serviceId;
        this.serviceName = serviceName;
        this.unitValue = unitValue;
        this.quantity = quantity;
        this.subtotal = subtotal;
    }
}
