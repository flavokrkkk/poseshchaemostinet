import { GroupAction } from "@/features/group/ui/groupAction";
import { GroupList } from "@/features/group/ui/groupList";
import { ERouteNames, Image } from "@/shared";
import { CardContent } from "@/widgets/cardContent/ui/cardContent";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQueryCacheData } from "@/shared/hooks/useQueryCacheData";
import { Group } from "@/entities/group/types/types";
import { CURRENT_GROUP_QUERY } from "@/entities/group/hooks/useGetGroup";
import { CURRENT_CUSTOMER_QUERY } from "@/entities/customer/hooks/useCurrentCustomer";
import { Customer } from "@/entities";

const GroupSettings = () => {
  const currentGroup = useQueryCacheData<Group>([CURRENT_GROUP_QUERY]);
  const currentUser = useQueryCacheData<Customer>([CURRENT_CUSTOMER_QUERY]);

  return (
    <section className="space-y-3">
      <CardContent
        cardTitle={
          <section className="flex items-center w-full justify-between">
            <div className="flex items-center space-x-3">
              <Link
                to={`/${ERouteNames.DASHBOARD_ELDER_ROUTE}`}
                className="cursor-pointer"
              >
                <ArrowLeft className="h-5 w-5 text-gray-400" />
              </Link>
              <h2> Группа</h2>
            </div>
            <GroupAction
              groupId={currentGroup?.id}
              userRole={currentUser.role}
            />
          </section>
        }
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="relative"
      >
        <Image
          src="/images/vacancy_main (2).png"
          alt="vacancy-banner"
          className="rounded-3xl w-full"
        />

        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-medium text-white">
                Удобно управляйте <br /> вашей группой!
              </h1>
            </div>
          </div>
        </div>
      </motion.div>
      <CardContent>
        {currentGroup && <GroupList group={currentGroup} />}
      </CardContent>
    </section>
  );
};

export default GroupSettings;
