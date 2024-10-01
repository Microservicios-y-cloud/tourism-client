export enum Status {
    POR_ACEPTAR = 1,
    ACEPTADA = 2,
    PAGADA = 3,
    RECHAZADA = 4,
    FINALIZADA = 5
}

export function getCodigo(status: Status): number {
    return status;
}
