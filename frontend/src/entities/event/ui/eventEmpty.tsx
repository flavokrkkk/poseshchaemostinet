import { Image } from "@/shared";

export const EventEmpty = () => {
  return (
    <div className="flex items-center flex-col space-y-2">
      <Image
        src="\images\Trendy-On-Bicycle--Streamline-Manila.png"
        alt="lesson-empty"
        width={163}
        height={163}
      />
      <p>Сегодня мероприятий нет, вечером домой!</p>
    </div>
  );
};
