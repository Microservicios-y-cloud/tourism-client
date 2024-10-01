import { Status } from "./Status";
import { PaymentStatus } from "./PaymentStatus";
import { Customer } from "./Customer";
import { OrderItem } from "./OrderItem";

export class OrderPurchaseRequest {
    id: string | null;
    creationDate: string; 
    orderStatus: Status;
    paymentStatus: PaymentStatus;
    createdBy: Customer;
    orderItems: OrderItem[];
    amount: number;

    constructor(
        id: string | null,
        creationDate: string,
        orderStatus: Status,
        paymentStatus: PaymentStatus,
        createdBy: Customer,
        orderItems: OrderItem[],
        amount: number
    ) {
        this.id = id;
        this.creationDate = creationDate;
        this.orderStatus = orderStatus;
        this.paymentStatus = paymentStatus;
        this.createdBy = createdBy;
        this.orderItems = orderItems;
        this.amount = amount;
    }
}
