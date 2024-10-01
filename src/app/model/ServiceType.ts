// Enum para ServiceType
export enum ServiceTypeEnum {
    TYPE1 = "TYPE1",
    TYPE2 = "TYPE2",
}

export class ServiceType {
    id: number;
    name: string;
    type: ServiceTypeEnum;

    constructor(id: number, name: string, type: ServiceTypeEnum) {
        this.id = id;
        this.name = name;
        this.type = type;
    }
}
