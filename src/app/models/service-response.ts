import { comentario } from "./comentario";
import { pregunta } from "./pregunta";
import { servicioAlimentacion } from "./servicioAlimentacion";
import { servicioAlojamiento } from "./servicioAlojamiento";
import { servicioTransporte } from "./servicioTransporte";
import { ubicacion } from "./ubicacion";

export class ServiceResponse {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public unitValue: number,
        public destinationId: number,
        public country: string,
        public city: string,
        public startDate: Date,
        public endDate: Date,
        public createdBy: string
    ) {}
}