import { CustomerRole } from "./types";

export const parseCustomerRole: Record<CustomerRole, string> = {
  ELDER: "Староста",
  STUDENT: "Студент",
  ADMIN: "Админ",
};
