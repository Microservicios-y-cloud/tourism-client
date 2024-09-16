import { Service } from './service'; // Asegúrate de tener esta clase definida
import { FoodType } from './FoodType'; // Asegúrate de tener esta clase definida
import { Location } from './Location'; // Asegúrate de tener esta clase definida

export class FoodService extends Service {
  id?: number; // Opcional, ya que el ID puede ser generado automáticamente por la base de datos
  foodType: FoodType;

  constructor(
    id: number | undefined,
    name: string,
    description: string,
    unitValue: number,
    destination: Location,
    startDate: Date,
    endDate: Date,
    createdBy: string,
    foodType: FoodType
  ) {
    super(name, description, unitValue, destination, startDate, endDate, createdBy); // Llamar al constructor de la clase base
    this.id = id;
    this.foodType = foodType;
  }
}
