import { ERegisterStep } from "@/features/register/types/registerStep";
import { StepsPropsType } from "../types/stepsPropsType";
import { Image } from "@/shared";
import { Button } from "@/shared/ui/button";

export const ScienceStep = ({ handleNextStep }: StepsPropsType) => {
  const handleToNextStep = () => handleNextStep(ERegisterStep.PERSONAL_STEP);

  return (
    <div className="flex flex-col items-center justify-between h-full">
      <div />
      <div className="flex flex-col items-center justify-between space-y-3">
        <Image
          src="\images\Welcome--Streamline-Manila.png"
          alt="welcome-step"
        />
        <p className="text-center font-medium">
          Желаем тебе успехов в учебе и посещения всех пар!
        </p>
      </div>
      <Button onClick={handleToNextStep} className="px-6 py-5">
        Продолжить
      </Button>
    </div>
  );
};
