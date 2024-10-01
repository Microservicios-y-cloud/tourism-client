import { Person } from "./Person";
import { Answer } from "./Answer";

export class QuestionResponse {
    id: string | null;
    serviceId: number | null;
    content: string;
    createdBy: Person;
    answers: Answer[] | null;

    constructor(
        id: string | null,
        serviceId: number | null,
        content: string,
        createdBy: Person,
        answers: Answer[] | null
    ) {
        this.id = id;
        this.serviceId = serviceId;
        this.content = content;
        this.createdBy = createdBy;
        this.answers = answers;
    }
}
