import { ERouteNames } from "@/shared";
import { CardContent } from "@/widgets/cardContent/ui/cardContent";
import { InfoCard } from "@/widgets/infoCard/ui/infoCard";
import { ChevronRightIcon, Newspaper, Settings, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ProfileMenu = () => {
  const navigate = useNavigate();

  const handleToAchievements = () => {
    navigate(
      `/${ERouteNames.DASHBOARD_STUDENT_ROUTE}/${ERouteNames.PROFILE_ROUTE}/${ERouteNames.ACHIEVEMENTS_ROUTE}`
    );
  };

  const handleToNews = () => {
    navigate(
      `/${ERouteNames.DASHBOARD_STUDENT_ROUTE}/${ERouteNames.PROFILE_ROUTE}/${ERouteNames.NEWS_ROUTE}`
    );
  };

  const handleToSettings = () => {
    navigate(
      `/${ERouteNames.DASHBOARD_STUDENT_ROUTE}/${ERouteNames.PROFILE_ROUTE}/${ERouteNames.SETTINGS_ROUTE}`
    );
  };

  return (
    <section className="space-y-4">
      <div className="space-y-4 flex flex-col">
        <div className="flex w-full space-x-2">
          <InfoCard
            className="bg-white shadow-md"
            arrowClassName="text-zinc-700"
            icon={<Trophy className="w-5 h-5 text-zinc-700" />}
            title={
              <span className="text-zinc-700">
                Мои <br /> Достижения
              </span>
            }
            onClick={handleToAchievements}
          />
          <InfoCard
            arrowClassName="text-zinc-700"
            className="bg-white shadow-md"
            icon={<Newspaper className="w-5 h-5 text-zinc-700" />}
            title={
              <span className="text-zinc-700">
                Общие <br /> новости
              </span>
            }
            onClick={handleToNews}
          />
        </div>
        <InfoCard
          arrowClassName="text-zinc-700"
          className="bg-white shadow-md"
          icon={<Settings className="w-5 h-5 text-zinc-700" />}
          title={
            <span className="text-zinc-700">
              Настройки <br /> приложения
            </span>
          }
          onClick={handleToSettings}
        />
      </div>

      <CardContent>
        <ul className="text-sm">
          <li className="flex items-center justify-between pb-3 border-b border-gray-200">
            <span className="text-gray-700">Сообщество</span>
            <ChevronRightIcon className="h-5 w-5 text-gray-400" />
          </li>
          <li className="flex items-center justify-between py-3 border-b border-gray-200">
            <span className="text-gray-700">О нас</span>
            <ChevronRightIcon className="h-5 w-5 text-gray-400" />
          </li>
          <li className="flex items-center justify-between py-3 border-b border-gray-200">
            <span className="text-gray-700">Правила использования</span>
            <ChevronRightIcon className="h-5 w-5 text-gray-400" />
          </li>
          <li className="flex items-center justify-between py-3 border-b border-gray-200">
            <span className="text-gray-700">Политика конфиденциальности</span>
            <ChevronRightIcon className="h-5 w-5 text-gray-400" />
          </li>
          <li className="flex items-center justify-between py-3 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">Контакт</span>
            </div>
            <ChevronRightIcon className="h-5 w-5 text-gray-400" />
          </li>
          <li className="flex items-center justify-between pt-3">
            <span className="text-gray-700">Поддержка</span>
            <ChevronRightIcon className="h-5 w-5 text-gray-400" />
          </li>
        </ul>
      </CardContent>
    </section>
  );
};
