import { comentario } from "./comentario";
import { servicio } from "./servicio";

export class itemCarrito {
    constructor(
        public id: number,
        public cantidad: number,
        public subTotal: number,
        public comentario: comentario | null,
        public servicio: servicio
    ) {}
}