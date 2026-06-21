import { Image } from "@/shared";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/shared/ui/carousel/carousel";
import clsx from "clsx";

interface PromoSliderProps {
  images: {
    src: string;
    alt: string;
  }[];
  className?: string;
}

export const PromoSlider = ({ images, className }: PromoSliderProps) => {
  return (
    <Carousel
      opts={{
        align: "start",
        slidesToScroll: 1,
        containScroll: "trimSnaps",
        loop: true,
      }}
      className={clsx("w-full", className)}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="h-32">
              <div className="relative h-full w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  className="h-32 w-full rounded-3xl"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
