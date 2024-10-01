export enum PaymentStatus {
    ACEPTADA = 1,
    RECHAZADA = 2
}

export function getCodigo(status: PaymentStatus): number {
    return status;
}
