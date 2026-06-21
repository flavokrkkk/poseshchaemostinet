import { Customer } from "@/entities/customer";
import { GroupItem } from "@/features/group/ui/groupItem";

interface AnalyticStudentListProps {
  studentsAnalytic: (Customer & { count: number })[];
}

export const AnalyticStudentList = ({
  studentsAnalytic,
}: AnalyticStudentListProps) => {
  return (
    <section className="flex justify-center items-center flex-col space-y-2">
      {studentsAnalytic.map((student) => (
        <GroupItem key={student.id} customer={student} action={<></>} />
      ))}
    </section>
  );
};
