import { Icon, IconTypes, Image } from "@/shared";
import { Header } from "@/widgets/header/ui/header";

export const LowGroupWidget = () => {
  return (
    <div
      style={{ height: "calc(100% - 24px)" }}
      className="w-full flex-col bg-zinc-100 fixed top-0 left-0 py-5 px-4 z-50 flex items-center justify-between"
    >
      <Header />
      <div className="flex flex-col items-center justify-between space-y-3">
        <Image
          src="\images\Online-Exams-Tests-1--Streamline-Manila.png"
          alt="welcome-step"
        />
        <p className="text-center font-medium">
          Попроси старосту отправить пригласительную ссылку в группу, чтобы
          начать пользоваться приложением!
        </p>
      </div>
      <div>
        <Icon type={IconTypes.POSNET_OUTLINED} />
      </div>
    </div>
  );
};
