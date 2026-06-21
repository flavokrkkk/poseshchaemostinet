import { Icon, IconTypes } from "../icon";

export const Loader = () => {
  return (
    <div className="h-screen w-full bg-white fixed top-0 left-0 z-50 flex items-center justify-center">
      <Icon type={IconTypes.POSNET_OUTLINED} className="animate-ping" />
    </div>
  );
};
