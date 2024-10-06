export class CartItem {
    serviceId: number | null;
    quantity: number;
    subtotal: number;

    constructor(
        serviceId: number,
        quantity: number,
        subtotal: number
    ) {
        this.serviceId = serviceId;
        this.quantity = quantity;
        this.subtotal = subtotal;
    }
}
