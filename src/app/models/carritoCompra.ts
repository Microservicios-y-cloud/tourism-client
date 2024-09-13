import { itemCarrito } from "./itemCarrito";

export class carritoCompra {
    constructor(
        public id:number,
        public fechaCreacion: string,
        public estado: boolean,
        public total: number,
        public itemCarrito: itemCarrito[]
    ) {}
}