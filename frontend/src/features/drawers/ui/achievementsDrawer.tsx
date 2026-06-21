import { Drawer, DrawerContent, DrawerTitle } from "@shared/ui/drawer/drawer";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { drawerSelectors } from "@/entities/drawer/model/store/drawerSlice";
import { useActions } from "@/shared/hooks/useActions";
import { EDrawerVariables } from "@/shared/lib/utils/drawerVariables";
import { Achievement } from "@/entities/achievements/types/types";
import { AchievementWidget } from "@/entities/achievements/ui/achievementWidget";

export const AchievementsDrawer = () => {
  const isOpen = useAppSelector(drawerSelectors.isOpen);
  const type = useAppSelector(drawerSelectors.selectType);
  const selectAchievements = useAppSelector(
    drawerSelectors.data
  ) as unknown as Achievement;
  const { toggleDrawer } = useActions();

  const isDrawerOpen = isOpen && type === EDrawerVariables.ACHIEVEMENTS_DRAWER;

  const handleClose = () => {
    toggleDrawer(false);
  };

  return (
    <Drawer open={isDrawerOpen} onClose={handleClose}>
      <DrawerContent className="bg-gradient-to-br from-[#E0F2F7] via-[#ADD8E6] to-[#4682B4]">
        <DrawerTitle className="text-lg hidden">
          {selectAchievements.template.title}
        </DrawerTitle>
        <div className="flex flex-col pb-0 py-0 space-y-4">
          <AchievementWidget achievement={selectAchievements} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
