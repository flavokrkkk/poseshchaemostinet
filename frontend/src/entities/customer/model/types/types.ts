import { Customer } from "../../types";

export interface CustomerSlice {
  customerFormInfo: Partial<Customer> | null;
}
