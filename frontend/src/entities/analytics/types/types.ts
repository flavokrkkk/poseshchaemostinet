import { EAttendanceType } from "@/entities/attendance/types/types";

export type AttendanceTypeCell = {
  visitors: number;
  fill: string;
  attendance: string;
  attendanceType: EAttendanceType;
};

export type GroupAnalytics = {
  analytics: AttendanceTypeCell[];
  topStudents: Array<{ userId: string; fullName: string; count: number }>;
};
