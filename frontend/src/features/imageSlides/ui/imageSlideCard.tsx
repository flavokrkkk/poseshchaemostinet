import { Image } from "@/shared";

interface ImageSlideCardProps {
  index: number;
  src: string;
  altPreffix: string;
}

export const ImageSlideCard = ({
  index,
  src,
  altPreffix,
}: ImageSlideCardProps) => (
  <div
    key={index}
    className="w-full overflow-hidden bg-white rounded-xl shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.01] border border-gray-100"
  >
    <Image
      src={src}
      alt={`${altPreffix} ${index + 1}`}
      className="w-full h-auto object-cover"
      loading="lazy"
    />
  </div>
);
