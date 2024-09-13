import { publishFacade } from "@angular/compiler";
import { ordenCompra } from "./ordenCompra";
import { carritoCompra } from "./carritoCompra";
import { pregunta } from "./pregunta";

export class cliente {
    constructor(
        public nombreUsuario: string,
        public contraseña: string,
        public nombre: string,
        public fechaNacimiento: string,
        public foto: string,
        public descripcion: string,
        public ordenCompra: ordenCompra | null,
        public carritoCompras: carritoCompra[] | null,
        public pregunta: pregunta[] | null
    ) {}
}