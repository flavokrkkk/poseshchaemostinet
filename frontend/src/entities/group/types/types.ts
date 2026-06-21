import { Customer } from "@/entities/customer";

export interface Group {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  universityId: string;
  elderId: string | null;
  users: Array<Customer>;
}

export interface GroupDto {
  name: string;
  universityId: string;
  elderId: string;
}

export interface GroupInviteDto {
  groupId: string;
}
