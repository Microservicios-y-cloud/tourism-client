export class servicioAlojamiento {
    constructor(
        public tipoAlojamiento: string,
        public fechaLlegada: string,
        public fechaSalida: string,
        public direccion: string,
        public capacidad: number
    ) {}
}