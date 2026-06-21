import { ERegisterStep } from "@/features/register/types/registerStep";

export interface StepsPropsType {
  handleNextStep: (step: ERegisterStep) => void;
}
