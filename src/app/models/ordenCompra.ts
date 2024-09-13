import { itemCarrito } from "./itemCarrito";
import { itemOrden } from "./itemOrden";
import { pago } from "./pago";

export class ordenCompra {
    constructor(
        public id:number,
        public fechaCreacion: string,
        public estado: boolean,
        public total: number,
        public pago: pago | null,
        public itemOrden: itemOrden[]
    ) {}
}