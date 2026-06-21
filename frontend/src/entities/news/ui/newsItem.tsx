import { Image } from "@/shared";
import { News } from "../types/types";
import { motion } from "framer-motion";

interface NewsItemProps {
  news: News;
  index: number;
  onDrawerOpen: (newsIds: number) => void;
}

export const NewsItem = ({ news, index, onDrawerOpen }: NewsItemProps) => {
  const handleOpenNewsDrawer = () => {
    onDrawerOpen(index);
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl cursor-pointer"
      onClick={handleOpenNewsDrawer}
    >
      <Image
        alt={`news-photo-${index}`}
        src={"/images/photo_2025-08-13_00-35-24.jpg"}
        className="h-48 w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm p-5 flex flex-col justify-end">
        <span className="text-xs text-zinc-200">{news.date}</span>
        <h3 className="text-lg font-bold text-white mt-1">{news.title}</h3>
        <p className="text-sm text-zinc-200 line-clamp-2">{news.content}</p>
      </div>
    </motion.div>
  );
};
