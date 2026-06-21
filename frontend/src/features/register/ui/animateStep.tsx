import { PropsWithChildren } from "react";

export const AnimateStep = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute inset-0 animate-fadeInSlide">{children}</div>
    </div>
  );
};
