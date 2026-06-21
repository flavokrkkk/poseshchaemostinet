export type CustomerRole = "ELDER" | "STUDENT" | "ADMIN";
export type CustomerGender = "MALE" | "FEMALE";

export interface CustomerFormInfo {
  id: string;
  fullName: string;
  gender: CustomerGender;
  role: CustomerRole;
  password: string;
  email: string;
}

export interface Customer {
  id: string;
  email: string;
  password: string;
  avatarUrl: string;
  role: CustomerRole;
  fullName: string;
  gender: CustomerGender;
  groupId: string;
  createdAt: string;
}
