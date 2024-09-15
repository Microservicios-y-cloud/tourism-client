import { comentario } from "./comentario";
import { Service } from "./service";

export class itemCarrito {
    constructor(
        public id: number,
        public cantidad: number,
        public subTotal: number,
        public comentario: comentario | null,
        public servicio: Service
    ) {}
}