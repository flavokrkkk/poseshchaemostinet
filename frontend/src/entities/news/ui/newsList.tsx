import { useActions } from "@/shared/hooks/useActions";
import { mockNews } from "../lib/mockNews";
import { NewsItem } from "./newsItem";
import { EDrawerVariables } from "@/shared/lib/utils/drawerVariables";
import { useCallback } from "react";

export const NewsList = () => {
  const { setOpenDrawer } = useActions();

  const handleOpenDrawer = useCallback((newsIds: number) => {
    if (!newsIds && newsIds !== 0) return;
    setOpenDrawer({
      isOpen: true,
      type: EDrawerVariables.NEWS_DRAWER,
      data: { ...mockNews[newsIds] },
    });
  }, []);

  return (
    <div className="space-y-4">
      {mockNews.map((news, index) => (
        <NewsItem
          key={news.id}
          index={index}
          news={news}
          onDrawerOpen={handleOpenDrawer}
        />
      ))}
    </div>
  );
};
