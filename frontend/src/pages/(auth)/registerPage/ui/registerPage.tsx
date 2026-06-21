import { ERegisterStep, getRegisterStep } from "@/features";
import { AnimateStep } from "@/features/register/ui/animateStep";
import { useCallback, useState } from "react";

const RegisterPage = () => {
  const [registerStep, setRegisterStep] = useState<ERegisterStep>(
    ERegisterStep.WELCOME_STEP
  );

  const handleNextStep = useCallback(
    (step: ERegisterStep) => setRegisterStep(step),
    []
  );

  const RegisterStep = getRegisterStep(registerStep);

  return (
    <AnimateStep key={registerStep}>
      <RegisterStep handleNextStep={handleNextStep} />
    </AnimateStep>
  );
};

export default RegisterPage;
