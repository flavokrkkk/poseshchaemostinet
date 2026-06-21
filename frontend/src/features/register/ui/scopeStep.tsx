import { ERegisterStep } from "@/features/register/types/registerStep";
import { StepsPropsType } from "../types/stepsPropsType";
import { Image } from "@/shared";
import { Button } from "@/shared/ui/button";

export const ScopeStep = ({ handleNextStep }: StepsPropsType) => {
  const handleToNextStep = () => handleNextStep(ERegisterStep.SCIENCE_STEP);

  return (
    <div className="flex flex-col items-center justify-between h-full">
      <div />
      <div className="flex flex-col items-center justify-between space-y-3">
        <Image
          src="\images\Online-Exams-Tests-1--Streamline-Manila.png"
          alt="welcome-step"
        />
        <p className="text-center font-medium">
          У нас ты сможешь удобно вести посещаемость группы и смотреть
          статистику по своим парам.
        </p>
      </div>
      <Button onClick={handleToNextStep} className="px-6 py-5">
        Продолжить
      </Button>
    </div>
  );
};
