import { reporteClima } from "./reporteClima";

export class pago {
    constructor(
        public id: number,
        public referencia: string,
        public cantidad: number,
        public total: number,
        public metodoPago: string,
        public reporteClima: reporteClima[] | null
    ) {}
}