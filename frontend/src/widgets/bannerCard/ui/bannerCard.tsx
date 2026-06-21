import { Button, Image } from "@/shared/ui";
import { ReactNode } from "react";

export const BannerCard = ({
  imageSrc,
  title,
  highlight,
  disabled,
  buttonText,
  onClick,
}: {
  imageSrc: string;
  title: string;
  highlight: string;
  disabled?: boolean;
  buttonText: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div className="bg-blue-500 justify-center items-center rounded-3xl w-full p-4 flex flex-col gap-4">
      <Image width={172} height={172} alt="banner" src={imageSrc} />
      <p className="text-xs text-center text-white">
        {title} <br />
        <span className="font-semibold">{highlight}</span>
      </p>
      <Button
        disabled={disabled}
        variant="outline"
        className="text-black w-full rounded-xl"
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </div>
  );
};
