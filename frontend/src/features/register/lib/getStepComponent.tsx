import {
  AboutStep,
  FinishStep,
  InfoStep,
  PersonalStep,
  ScienceStep,
  ScopeStep,
  WelcomeStep,
} from "../ui";
import { ERegisterStep } from "../types";

const registerSteps: Record<
  ERegisterStep,
  React.ElementType<{
    handleNextStep: (step: ERegisterStep) => void;
  }>
> = {
  [ERegisterStep.WELCOME_STEP]: ({
    handleNextStep,
  }: {
    handleNextStep: (step: ERegisterStep) => void;
  }) => <WelcomeStep handleNextStep={handleNextStep} />,
  [ERegisterStep.ABOUT_STEP]: ({
    handleNextStep,
  }: {
    handleNextStep: (step: ERegisterStep) => void;
  }) => <AboutStep handleNextStep={handleNextStep} />,
  [ERegisterStep.SCOPE_STEP]: ({
    handleNextStep,
  }: {
    handleNextStep: (step: ERegisterStep) => void;
  }) => <ScopeStep handleNextStep={handleNextStep} />,
  [ERegisterStep.SCIENCE_STEP]: ({
    handleNextStep,
  }: {
    handleNextStep: (step: ERegisterStep) => void;
  }) => <ScienceStep handleNextStep={handleNextStep} />,
  [ERegisterStep.PERSONAL_STEP]: ({
    handleNextStep,
  }: {
    handleNextStep: (step: ERegisterStep) => void;
  }) => <PersonalStep handleNextStep={handleNextStep} />,
  [ERegisterStep.INFO_STEP]: ({
    handleNextStep,
  }: {
    handleNextStep: (step: ERegisterStep) => void;
  }) => <InfoStep handleNextStep={handleNextStep} />,
  [ERegisterStep.FINISH_STEP]: () => <FinishStep />,
};

export function getRegisterStep(currentStep: ERegisterStep) {
  return registerSteps[currentStep];
}
