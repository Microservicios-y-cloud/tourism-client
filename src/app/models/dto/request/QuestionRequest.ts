export class QuestionRequest {
    constructor(
        public content: string,
        public date: Date,
        public createdBy: string,
        public serviceId: string,
    ) {
    }
}
