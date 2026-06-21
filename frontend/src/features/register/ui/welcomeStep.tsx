import { Image } from "@/shared";
import { StepsPropsType } from "../types/stepsPropsType";
import { Button } from "@/shared/ui/button";
import { ERegisterStep } from "@/features/register/types/registerStep";

export const WelcomeStep = ({ handleNextStep }: StepsPropsType) => {
  const handleToNextStep = () => handleNextStep(ERegisterStep.ABOUT_STEP);

  return (
    <div className="flex flex-col items-center justify-between h-full">
      <div />
      <div className="flex flex-col items-center justify-between space-y-3">
        <Image
          src="\images\Welcome--Streamline-Manila.png"
          alt="welcome-step"
        />
        <p className="text-center font-medium">
          Привет! Мы – команда{" "}
          <span className="font-semibold">посещаемости.net</span>, и мы бы
          хотели рассказать тебе о нашем сервисе.
        </p>
      </div>
      <Button onClick={handleToNextStep} className="px-6 py-5">
        Продолжить
      </Button>
    </div>
  );
};
