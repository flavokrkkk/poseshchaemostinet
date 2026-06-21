import { Image } from "@/shared";
import { StepsPropsType } from "../types/stepsPropsType";
import { ERegisterStep } from "@/features/register/types/registerStep";
import { Button } from "@/shared/ui/button";

export const AboutStep = ({ handleNextStep }: StepsPropsType) => {
  const handleToNextStep = () => handleNextStep(ERegisterStep.SCOPE_STEP);

  return (
    <div className="flex flex-col items-center justify-between h-full">
      <div />
      <div className="flex flex-col items-center justify-between space-y-3">
        <Image
          src="\images\Graduation-1--Streamline-Manila.png"
          alt="welcome-step"
        />
        <p className="text-center font-medium">
          <span className="font-semibold">Посещаемости.net</span> предназначен
          для старост и студентов ВУЗов.
        </p>
      </div>
      <div>
        <Button onClick={handleToNextStep} className="px-6 py-5">
          Продолжить
        </Button>
      </div>
    </div>
  );
};
