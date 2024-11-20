import { Customer } from "./Customer";

export class UserBalanceRequest{
  id?: string;
  user: Customer | undefined;
  amount?: number;
}