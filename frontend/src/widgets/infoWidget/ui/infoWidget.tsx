import { ERouteNames } from "@/shared";
import { InfoCard } from "@/widgets/infoCard/ui/infoCard";
import { UserRound, Award } from "lucide-react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface InfoWidgetProps {
  bannerCard: ReactNode;
}

export const InfoWidget = ({ bannerCard }: InfoWidgetProps) => {
  const navigate = useNavigate();

  const handleToSchedule = () => navigate(ERouteNames.SCHEDULE_ROUTE);
  const handleToGroupSettings = () => navigate(ERouteNames.GROUP_SETTINGS);

  return (
    <section className="flex space-x-2">
      {/* Модуль с рейтингом всех групп университета - по посещаемости */}
      {bannerCard}
      <div className="flex flex-col w-full space-y-2">
        <InfoCard
          icon={<UserRound className="w-5 h-5 text-blue-700" />}
          title={
            <>
              Настройки <br /> расписания
            </>
          }
          onClick={handleToSchedule}
        />
        <InfoCard
          icon={<Award className="w-5 h-5 text-blue-700" />}
          title={
            <>
              Настройки <br /> группы
            </>
          }
          onClick={handleToGroupSettings}
        />
      </div>
    </section>
  );
};
