import { ErrorMessages } from "@/shared/api/queryError";
import { ECustomerEndpoints } from "../lib/endpoints";
import { Customer } from "../types";
import { authApi } from "@/shared";

class CustomerService {
  public async getCurrentCustomer(): Promise<Customer> {
    try {
      const response = await authApi
        .get(ECustomerEndpoints.CURRENT_CUSTOMER)
        .json<Customer>();
      return response;
    } catch (error) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }
}

export const { getCurrentCustomer } = new CustomerService();
