import { ImageSlideCard } from "@/features/imageSlides/ui/imageSlideCard";
import { getStaticImage } from "@/shared/lib/utils/getStaticImage";

const BrandPage = () => {
  const advertisementSlides = getStaticImage("brand");
  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="flex flex-col items-center gap-4">
        {advertisementSlides.map((src, index) => (
          <ImageSlideCard
            key={index}
            src={src}
            index={index}
            altPreffix="Бренд"
          />
        ))}
      </div>
    </div>
  );
};

export default BrandPage;
