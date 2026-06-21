import { UniversitySelect } from "@/features/university/ui/universitySelect";
import { BackBadge, ERouteNames, Image } from "@/shared";
import { motion } from "framer-motion";

const UniversityPage = () => {
  return (
    <div className="space-y-2">
      <BackBadge
        backPath={`/${ERouteNames.DASHBOARD_ELDER_ROUTE}`}
        title="Новое расписание"
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="relative"
      >
        <Image
          src="/images/vacancy_main.png"
          alt="vacancy-banner"
          className="rounded-3xl w-full"
        />

        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-medium text-white">
                Мы добавили почти все ВУЗЫ и колледжи страны!
              </h1>
            </div>
          </div>
        </div>
      </motion.div>
      <UniversitySelect />
    </div>
  );
};

export default UniversityPage;
