import { redSocial } from "./redSocial";
import { servicio } from "./service";

export class proveedor {
    constructor(
        public nombreUsuario: string,
        public contraseña: string,
        public nombre: string,
        public fechaNacimiento: string,
        public foto: string,
        public descripcion: string,
        public telefono: number,
        public paginaWeb: string,
        public redSocial: redSocial[] | null,
        public servicios: servicio[] | null
    ) {}
}