import { EDrawerVariables } from "@/shared/lib/utils/drawerVariables";

export type DrawerData =
  | Date
  | string
  | number
  | null
  | undefined
  | Record<string, unknown>
  | unknown[];

export interface IDrawerSlice {
  isOpen: boolean;
  selectType: EDrawerVariables | null;
  data: DrawerData;
}
