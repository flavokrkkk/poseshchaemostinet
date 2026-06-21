import { Icon, IconTypes } from "@/shared";
import { Image } from "@/shared/ui/image/image";

const LendingPage = () => {
  return (
    <div className="w-full h-full flex-col flex items-center">
      <div className="flex-1 flex items-center justify-center">
        <div className="p-8 rounded-4xl shadow-xl bg-white max-w-[343px] max-h-[304px] w-full h-full flex flex-col space-y-4 items-center justify-center">
          <Image
            src="images/maintenance--customer-service-support-maintenance.png"
            alt="lending-banner"
          />
          <p className="text-center font-semibold text-sm">
            Скоро на этом месте будет красивый лендинг!
          </p>
        </div>
      </div>
      <div className="text-sm font-semibold flex items-center space-x-1">
        <span>Создается командой разработки</span>
        <Icon type={IconTypes.POSNET_OUTLINED} />
      </div>
    </div>
  );
};

export default LendingPage;
