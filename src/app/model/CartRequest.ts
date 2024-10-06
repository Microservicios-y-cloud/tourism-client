import { CartItem } from "./CartItem";
import { Customer } from "./Customer";

export class CartRequest {
    createdBy: Customer;
    cartItems: CartItem[];

    constructor(
        createdBy: Customer,
        cartItems: CartItem[]
    ) {
        this.createdBy = createdBy;
        this.cartItems = cartItems;
    }
}
