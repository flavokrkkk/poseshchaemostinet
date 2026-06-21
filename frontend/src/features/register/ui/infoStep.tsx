import { cn, Image } from "@/shared";
import { ERegisterStep, StepsPropsType } from "../types";
import { Button } from "@/shared/ui/button";
import { useState } from "react";
import { CustomerRole, isCustomerRole } from "@/entities";
import { useActions } from "@/shared/hooks/useActions";

export const InfoStep = ({ handleNextStep }: StepsPropsType) => {
  const { setCustomerInfo } = useActions();
  const [selectRole, setSelectRole] = useState<CustomerRole | "">("");

  const handleToNextStep = () => {
    if (isCustomerRole(selectRole)) {
      setCustomerInfo({ role: selectRole });
      handleNextStep(ERegisterStep.FINISH_STEP);
    }
  };

  const handleSelectRole = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectRole = e.currentTarget.value;
    if (isCustomerRole(selectRole)) {
      setSelectRole(selectRole);
    }
  };

  return (
    <div className="flex items-center flex-col justify-between h-full">
      <div />
      <div className="space-y-3">
        <h2 className="text-center">Кто ты в своей группе?</h2>
        <section className="flex space-x-3">
          <button
            value={"ELDER"}
            className={cn(
              "bg-white space-y-1 p-5 px-7 rounded-2xl cursor-pointer border border-white transition-colors ease-in-out",
              selectRole === "ELDER" && "border border-blue-600"
            )}
            onClick={handleSelectRole}
          >
            <Image
              src="\images\Online-Exams-Tests-1--Streamline-Manila.png"
              alt="info-starosta"
              className="w-[100px] h-[80px] md:w-[100px] md:h-[100px]"
            />
            <span className="text-sm">Староста</span>
          </button>
          <button
            value={"STUDENT"}
            className={cn(
              "bg-white space-y-1 p-5 px-7 rounded-2xl cursor-pointer border border-white transition-colors ease-in-out",
              selectRole === "STUDENT" && "border border-blue-600"
            )}
            onClick={handleSelectRole}
          >
            <Image
              src="\images\Graduation-1--Streamline-Manila.png"
              alt="info-student"
              className="w-[100px] h-[80px] md:w-[100px] md:h-[100px]"
            />
            <span className="text-sm">Студент</span>
          </button>
        </section>
      </div>
      <Button
        disabled={!selectRole}
        onClick={handleToNextStep}
        className="px-6 py-5 disabled:cursor-not-allowed"
      >
        Продолжить
      </Button>
    </div>
  );
};
