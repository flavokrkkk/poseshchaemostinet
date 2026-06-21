import { ImageSlideCard } from "@/features/imageSlides/ui/imageSlideCard";
import { getStaticImage } from "@/shared/lib/utils/getStaticImage";

const AdvertisementPage = () => {
  const advertisementSlides = getStaticImage("advertisement");
  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="flex flex-col items-center gap-4">
        {advertisementSlides.map((src, index) => (
          <ImageSlideCard
            key={index}
            src={src}
            index={index}
            altPreffix="Реклама"
          />
        ))}
      </div>
    </div>
  );
};

export default AdvertisementPage;
