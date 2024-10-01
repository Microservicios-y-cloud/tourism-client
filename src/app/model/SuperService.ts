import { FoodTypeResponse } from './FoodTypeResponse';
import { AccommodationTypeResponse } from './AccommodationTypeResponse';
import { LocationResponse } from './LocationResponse';
import { TransportTypeResponse } from './TransportTypeResponse';
import { ServiceType } from './ServiceType';

export class SuperService {
    id?: number; 
    createdBy?: string;
    destination?: LocationResponse;
    name?: string;
    description?: string;
    unitValue?: number; 
    startDate?: Date; 
    endDate?: Date;
    serviceType?: ServiceType;
    foodType?: FoodTypeResponse;
    accommodationType?: AccommodationTypeResponse; 
    capacity?: number;
    transportationType?: TransportTypeResponse;
    origin?: LocationResponse; 
    company?: string; 

    constructor() {

    }
}
