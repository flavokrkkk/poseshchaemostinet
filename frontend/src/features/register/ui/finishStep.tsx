import { useRegisterMutation } from "@/entities/auth/hooks/useRegisterMutate";
import { customerFormInfo } from "@/entities/customer/model/store/customerSlice";
import { Image } from "@/shared";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { Button } from "@/shared/ui/button";
import { RegisterDtoSchema } from "../lib/schemes/registerDtoSchema";

export const FinishStep = () => {
  const customerInfo = useAppSelector(customerFormInfo);
  const { mutate: register } = useRegisterMutation();

  const handleToNextStep = () => {
    if (!customerInfo) return;

    const requestDto = {
      email: customerInfo.email,
      fullName: customerInfo.fullName,
      password: customerInfo.password,
      role: customerInfo.role,
      gender: customerInfo.gender,
    };

    const parseResult = RegisterDtoSchema.safeParse(requestDto);

    if (!parseResult.success) {
      console.error("Ошибка валидации:", parseResult.error.format());
      return;
    }

    register(parseResult.data);
  };

  return (
    <div className="flex flex-col items-center justify-between h-full">
      <div />
      <div className="flex flex-col items-center justify-between space-y-3">
        <Image
          src="\images\Online-Exams-Tests-1--Streamline-Manila.png"
          alt="welcome-step"
        />
        <p className="text-center font-medium">
          Ты успешно зарегестрировался! Теперь давай составим расписание твоей
          группы вместе.
        </p>
      </div>
      <Button onClick={handleToNextStep} className="px-6 py-5">
        Продолжить
      </Button>
    </div>
  );
};
