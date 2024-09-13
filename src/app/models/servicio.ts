import { comentario } from "./comentario";
import { pregunta } from "./pregunta";
import { servicioAlimentacion } from "./servicioAlimentacion";
import { servicioAlojamiento } from "./servicioAlojamiento";
import { servicioTransporte } from "./servicioTransporte";
import { ubicacion } from "./ubicacion";

export class servicio {
    constructor(
        public id: number,
        public nombre: string,
        public descripcion: string,
        public precioUnitario: number,
        public ubicacion: ubicacion,
        public preguntas: pregunta[] | null,
        public comentario: comentario[] | null,
        public servicioAlimentacion: servicioAlimentacion | null,
        public servicioAlojamiento: servicioAlojamiento | null,
        public servicioTransporte: servicioTransporte | null
    ) {}
}