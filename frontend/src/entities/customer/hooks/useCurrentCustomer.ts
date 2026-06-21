import { useQuery } from "@tanstack/react-query";
import { getCurrentCustomer } from "../api/customerService";
import { getAccessToken } from "@/entities/token/lib/tokenService";

export const CURRENT_CUSTOMER_QUERY = "current-customer-query";

export const useCurrentCustomer = () => {
  return useQuery({
    queryKey: [CURRENT_CUSTOMER_QUERY],
    queryFn: getCurrentCustomer,
    enabled: !!getAccessToken(),
  });
};
