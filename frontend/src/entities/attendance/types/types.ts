import { Customer } from "@/entities/customer";

export const enum EAttendanceType {
  PRESENT = "PRESENT",
  ABSENT = "ABSENT",
  EXCUSED = "EXCUSED",
  EMPTIES = "EMPTIES",
}

export interface Attendance {
  createdAt: string;
  id: string;
  lessonId: string;
  status: EAttendanceType;
  updatedAt: string;
  userId: string;
  user: Customer;
}

export interface UpdateAttendanceDto {
  lessonId: string;
  userId: string;
  status: EAttendanceType;
}

export interface TopGroupByAttendace {
  groupId: string;
  groupName: string;
  count: number;
}

export interface GetTopGroupsDto {
  attendanceType: EAttendanceType;
  startDate?: string;
  endDate?: string;
}
