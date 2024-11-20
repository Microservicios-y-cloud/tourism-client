import { Customer } from "./Customer";
import { Qualification } from "./Qualification";

export class CommentRequest {
    constructor(
    public id: string | null,
    public serviceId: number,
    public qualification: Qualification,
    public createdBy: Customer | undefined,
    public content : string,
    public date?: string,
    ){

    }
}
