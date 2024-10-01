import { CartItem } from "./CartItem";
import { Customer } from "./Customer";

export class CartRequest {
    id: string | null;
    createdBy: Customer;
    cartItems: CartItem[];

    constructor(
        id: string | null,
        createdBy: Customer,
        cartItems: CartItem[]
    ) {
        this.id = id;
        this.createdBy = createdBy;
        this.cartItems = cartItems;
    }
}
