import { motion, AnimatePresence } from "framer-motion";
import { TopGroupByAttendace } from "../types/types";
import { TopThreeLeaders } from "./attendanceTopLeaderCards";
import { LeaderCard } from "./attendanceLeaderCard";

interface AttendanceBoardContentProps {
  leaders: Array<TopGroupByAttendace>;
}

export const AttendanceBoardContent = ({
  leaders,
}: AttendanceBoardContentProps) => {
  const topLeaders = leaders.slice(0, 3);
  const restOfLeaders = leaders.slice(3);

  return (
    <section className="mt-10 space-y-4">
      <div className="relative rounded-b-[4rem] z-0">
        <TopThreeLeaders top3={topLeaders} />
      </div>

      <motion.div layout transition={{ duration: 0.5 }}>
        <AnimatePresence>
          <motion.div
            className="pb-4 space-y-2 overflow-y-auto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            {restOfLeaders.map((leader, index) => (
              <LeaderCard key={leader.groupId} leader={leader} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
