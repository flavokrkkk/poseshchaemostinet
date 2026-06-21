import { BackBadge, ERouteNames } from "@/shared";
import { Checkbox } from "@/shared/ui/checkbox/checkbox";
import { CardContent } from "@/widgets/cardContent/ui/cardContent";

const SettingsPage = () => {
  return (
    <div className="space-y-3">
      <BackBadge
        backPath={`/${ERouteNames.DASHBOARD_STUDENT_ROUTE}/${ERouteNames.PROFILE_ROUTE}`}
        title="К меню профиля"
      />
      <CardContent>
        <section className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg flex flex-col items-center space-y-2">
              <div className="w-full h-40 bg-gray-100 rounded-md"></div>
              <span className="text-center text-sm">Светлая</span>
              <Checkbox className="rounded-xl data-[state=checked]:bg-zinc-500 data-[state=checked]:border-zinc-300" />
            </div>
            <div className="rounded-lg flex flex-col items-center space-y-2">
              <div className="w-full h-40 bg-gray-800 rounded-md"></div>
              <span className="text-center text-sm">Темная</span>
              <Checkbox className="rounded-xl data-[state=checked]:bg-zinc-500 data-[state=checked]:border-zinc-300" />
            </div>
            <div className="rounded-lg flex flex-col items-center space-y-2">
              <div className="w-full h-40 rounded-md flex">
                <div className="w-full bg-zinc-100 rounded-l-md" />
                <div className="w-full bg-gray-800 rounded-r-md" />
              </div>
              <span className="text-center text-sm">Как в системе</span>
              <Checkbox className="rounded-xl data-[state=checked]:bg-zinc-500 data-[state=checked]:border-zinc-300" />
            </div>
          </div>
        </section>
      </CardContent>
    </div>
  );
};

export default SettingsPage;
