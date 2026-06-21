import { Icon, IconTypes } from "@/shared";
import { Header } from "@/widgets/header/ui/header";

export const LoadingWidget = () => {
  return (
    <div
      style={{ height: "calc(100% - 24px)" }}
      className="w-full flex-col bg-zinc-100 fixed top-0 left-0 py-5 px-4 z-50 flex items-center justify-between"
    >
      <Header />
      <div className="flex flex-col items-center justify-between space-y-3">
        <Icon type={IconTypes.POSNET_OUTLINED} className="animate-ping" />
      </div>
      <div />
    </div>
  );
};
