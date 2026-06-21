import { customerSliceActions } from "@/entities/customer/model/store/customerSlice";
import { drawerActions } from "@/entities/drawer/model/store/drawerSlice";
import { modalActions } from "@/entities/modal/model/store/modalSlice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(
    {
      ...customerSliceActions,
      ...modalActions,
      ...drawerActions,
    },
    dispatch
  );
};
