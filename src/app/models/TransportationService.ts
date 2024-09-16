import { TransportType } from './TransportType'; // Asegúrate de tener esta clase definida
import { Location } from './Location'; // Asegúrate de tener esta clase definida
import { Service } from './service'; // Asegúrate de tener esta clase definida

export class TransportationService extends Service {
  id?: number; // Opcional, ya que el ID puede ser generado automáticamente por la base de datos
  transportType: TransportType;
  company: string;
  origin: Location;

  constructor(
    id: number | undefined,
    name: string,
    description: string,
    unitValue: number,
    destination: Location,
    startDate: Date,
    endDate: Date,
    createdBy: string,
    transportType: TransportType,
    company: string,
    origin: Location
  ) {
    super(name, description, unitValue, destination, startDate, endDate, createdBy); // Llamar al constructor de la clase base
    this.id = id;
    this.transportType = transportType;
    this.company = company;
    this.origin = origin;
  }
}
