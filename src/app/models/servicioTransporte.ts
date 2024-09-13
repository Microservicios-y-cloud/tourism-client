import { ubicacion } from "./ubicacion";

export class servicioTransporte {
    constructor(
        public tipoTransporte: string,
        public fechaSalida: string,
        public fechaLlegada: string,
        public empresaTransporte: string,
        public origen: ubicacion
    ) {}
}