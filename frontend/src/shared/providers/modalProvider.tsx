import { useAppSelector } from "../hooks/useAppSelector";
import { getModalComponent } from "../lib/utils/modalVariables";
import { modalSelectors } from "@/entities/modal/model/store/modalSlice";

const ModalProvider = () => {
  const selectType = useAppSelector(modalSelectors.selectType);
  if (!selectType) return null;

  return getModalComponent(selectType);
};

export default ModalProvider;
