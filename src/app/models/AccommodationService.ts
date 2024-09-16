import { Service } from './service'; // Asegúrate de tener esta clase definida
import { AccommodationType } from './AccommodationType'; // Asegúrate de tener esta clase definida

export class AccommodationService extends Service {
  id?: number; // Opcional, ya que el ID puede ser generado automáticamente por la base de datos
  type: AccommodationType; // Referencia a la entidad AccommodationType
  capacity: number;

  constructor(
    id: number | undefined,
    name: string,
    description: string,
    unitValue: number,
    destination: Location, // Asegúrate de tener esta clase definida
    startDate: Date,
    endDate: Date,
    createdBy: string,
    type: AccommodationType,
    capacity: number
  ) {
    super(name, description, unitValue, destination, startDate, endDate, createdBy); // Llamar al constructor de la clase base
    this.id = id;
    this.type = type;
    this.capacity = capacity;
  }
}
