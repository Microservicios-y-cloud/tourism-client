export class Question {
    readonly id: number;
    readonly content: string;
    readonly date: Date;
    readonly createdBy: number;
    readonly serviceId: number;

    constructor(
        id: number,
        content: string,
        date: Date,
        createdBy: number,
        serviceId: number
    ) {
        this.id = id;
        this.content = content;
        this.date = date;
        this.createdBy = createdBy;
        this.serviceId = serviceId;
    }
}
