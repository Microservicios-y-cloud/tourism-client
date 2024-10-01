import { Person } from "./Person";

export class Answer {
    content: string;
    createdBy: Person;
    date: string; 

    constructor(
        content: string,
        createdBy: Person,
        date: string
    ) {
        this.content = content;
        this.createdBy = createdBy;
        this.date = date;
    }
}
