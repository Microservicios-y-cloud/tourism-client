export class PersonAnswer {
    id: string;
    name: string;
    email: string;

    constructor(id: string, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}

export class AnswerResponse {
    content: string;
    createdBy: PersonAnswer;
    date: Date;

    constructor(content: string, createdBy: PersonAnswer, date: string) {
        this.content = content;
        this.createdBy = createdBy;
        this.date = new Date(date);
    }
}
