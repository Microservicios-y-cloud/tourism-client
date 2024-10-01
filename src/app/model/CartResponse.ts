import { CartItem } from "./CartItem";
import { Customer } from "./Customer";

export class CartResponse {
    id: string | null;
    creationDate: string;
    lastUpdate: string | null; 
    createdBy: Customer;
    cartItems: CartItem[];

    constructor(
        id: string | null,
        creationDate: string,
        lastUpdate: string | null,
        createdBy: Customer,
        cartItems: CartItem[]
    ) {
        this.id = id;
        this.creationDate = creationDate;
        this.lastUpdate = lastUpdate;
        this.createdBy = createdBy;
        this.cartItems = cartItems;
    }
}
