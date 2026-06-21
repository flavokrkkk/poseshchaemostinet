import React from "react";
import { AttendanceTypeCell } from "../types/types";
import { AnalyticChart } from "./analyticChart";
import { AnalyticAttendanceList } from "./analyticAttendanceList";

interface AnalyticsContentProps {
  analytics: AttendanceTypeCell[];
}

export const AnalyticsContent = ({ analytics }: AnalyticsContentProps) => {
  const { totalHours } = React.useMemo(() => {
    return {
      totalHours: analytics?.reduce((acc, el) => acc + el.visitors * 2, 0),
    };
  }, [analytics]);

  return (
    <section>
      <AnalyticChart analytics={analytics} totalHours={totalHours} />
      <AnalyticAttendanceList analytics={analytics} totalHours={totalHours} />
    </section>
  );
};
