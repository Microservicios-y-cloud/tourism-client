export class OrderItem {
    subtotal: number;
    quantity: number;
    serviceId: number;

    constructor(
        subtotal: number,
        quantity: number,
        serviceId: number
    ) {
        this.subtotal = subtotal;
        this.quantity = quantity;
        this.serviceId = serviceId;
    }
}
