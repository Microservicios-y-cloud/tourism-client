import { Person } from "./Person";
import { Answer } from "./Answer";

export class Question {
    id: string | null;
    serviceId: number | null;
    date: string; 
    lastUpdate: string | null; 
    content: string;
    createdBy: Person;
    answers: Answer[];

    constructor(
        id: string | null,
        serviceId: number | null,
        date: string,
        lastUpdate: string | null,
        content: string,
        createdBy: Person,
        answers: Answer[]
    ) {
        this.id = id;
        this.serviceId = serviceId;
        this.date = date;
        this.lastUpdate = lastUpdate;
        this.content = content;
        this.createdBy = createdBy;
        this.answers = answers;
    }
}
