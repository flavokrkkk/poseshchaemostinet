import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@shared/ui/drawer/drawer";
import { Button, Image } from "@/shared";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { drawerSelectors } from "@/entities/drawer/model/store/drawerSlice";
import { useActions } from "@/shared/hooks/useActions";
import { EDrawerVariables } from "@/shared/lib/utils/drawerVariables";
import { News } from "@/entities/news/types/types";

export function NewsDrawer() {
  const isOpen = useAppSelector(drawerSelectors.isOpen);
  const type = useAppSelector(drawerSelectors.selectType);
  const selectNews = useAppSelector(drawerSelectors.data) as unknown as News;
  const { toggleDrawer } = useActions();

  const isDrawerOpen = isOpen && type === EDrawerVariables.NEWS_DRAWER;

  const handleClose = () => {
    toggleDrawer(false);
  };

  return (
    <Drawer open={isDrawerOpen} onClose={handleClose}>
      <DrawerContent>
        <div>
          <DrawerHeader>
            <DrawerTitle className="text-lg">{selectNews.title}</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col p-4 pb-0 py-0 space-y-4">
            <Image alt="news-banner" src="/images/Frame 14.png" />
            <p className="text-center">
              Мы решили не медлить, и почти сразу после релиза выпустили крутую
              функцию! События ВУЗов теперь можно смотреть и добавлять прямо в
              посещаемти.net
            </p>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button
                variant={"outline"}
                type="submit"
                className="w-full bg-white text-black py-5 rounded-2xl"
              >
                Закрыть
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
