import { useAppSelector } from "../hooks/useAppSelector";
import { drawerSelectors } from "@/entities/drawer/model/store/drawerSlice";
import { getDrawerComponent } from "../lib/utils/drawerVariables";

export const DrawerProvider = () => {
  const selectType = useAppSelector(drawerSelectors.selectType);
  if (!selectType) return null;

  return getDrawerComponent(selectType);
};
