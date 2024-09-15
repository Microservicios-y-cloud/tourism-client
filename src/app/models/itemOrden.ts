import { servicio } from "./service";

export class itemOrden {
    constructor(
        public id:number,
        public cantidad: number,
        public subTotal: number,
        public servicio: servicio
    ) {}
}