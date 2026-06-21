import { useQuery } from "@tanstack/react-query";
import {
  getAnalyticsByCustomer,
  getAnalyticsByGroup,
} from "../api/analyticsService";
import { useQueryCacheData } from "@/shared/hooks/useQueryCacheData";
import { CURRENT_GROUP_QUERY } from "@/entities/group/hooks/useGetGroup";
import { Group } from "@/entities/group/types/types";
import { EAttendanceType } from "@/entities/attendance/types/types";
import { Customer } from "@/entities/customer";

export const CUSTOMER_ANALYTICS_QUERY = "customer-analytics";
export const GROUP_ANALYTICS_QUERY = "group-analytics";

export const useCustomerAnalytics = () => {
  return useQuery({
    queryKey: [CUSTOMER_ANALYTICS_QUERY],
    queryFn: getAnalyticsByCustomer,
  });
};

export const useGroupAnalytics = () => {
  const { id, users } = useQueryCacheData<Group>([CURRENT_GROUP_QUERY]);

  return useQuery({
    queryKey: [GROUP_ANALYTICS_QUERY],
    queryFn: () =>
      getAnalyticsByGroup({
        groupId: id,
        attendanceType: EAttendanceType.PRESENT,
      }),
    select: (groupAnalytics) => ({
      ...groupAnalytics,
      topStudents: users.reduce((acc, item) => {
        const findUser = groupAnalytics.topStudents.find(
          (analytic) => analytic.userId === item.id
        );

        if (findUser) {
          acc.push({ ...item, count: findUser.count });
        }

        return acc;
      }, [] as (Customer & { count: number })[]),
    }),
    enabled: !!id,
  });
};
