import { useActions } from "@/shared/hooks/useActions";
import { useEffect } from "react";
import { EModalVariables } from "../../../shared/lib/utils/modalVariables";

export const useWelcomeModal = ({
  customerType,
  onEvent = () => {},
}: {
  customerType: "elder" | "student";
  onEvent?: VoidFunction;
}) => {
  const { setOpenModal } = useActions();

  useEffect(() => {
    const isReadWelcome = !!localStorage.getItem(
      `${EModalVariables.WELCOME_MODAL}-${customerType}`
    );

    if (!isReadWelcome) {
      setOpenModal({
        isOpen: true,
        type: EModalVariables.WELCOME_MODAL,
        data: { onEvent, customerType },
      });
    }
  }, []);
};
