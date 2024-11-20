export class itemService {
    constructor(
    public serviceId: number | null,
    public serviceName: string,
    public unitValue: number,
    public quantity: number,
    public subtotal: number,
    public serviceType? : string,
    public startDate?: Date,    // Agregar startDate
    public endDate?: Date,     // Agregar endDate
    public destinationCountry?: string,  // Agregar destination
    public destinationMunicipality?: string,  // Agregar destination
    public destinationCity?: string,  // Agregar destination
    public originCountry?: string,  // Agregar destination
    public originMunicipality?: string,  // Agregar destination
    public originCity?: string,  // Agregar destination
    public fechaCompra?: string,
    ){

    }
}
