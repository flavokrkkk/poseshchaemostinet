import { CustomerRole } from "../types";

export function isCustomerRole(role: string): role is CustomerRole {
  return role === "ELDER" || role === "STUDENT";
}
