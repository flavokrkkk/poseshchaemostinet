import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomerSlice } from "../types/types";
import { CustomerFormInfo } from "../../types";

const initialState: CustomerSlice = {
  customerFormInfo: null,
};

export const customerSlice = createSlice({
  name: "customer-slice",
  initialState,
  selectors: {
    customerFormInfo: (state) => state.customerFormInfo,
  },
  reducers: (create) => ({
    setCustomerInfo: create.reducer(
      (state, { payload }: PayloadAction<Partial<CustomerFormInfo>>) => {
        if (state.customerFormInfo) {
          state.customerFormInfo = {
            ...state.customerFormInfo,
            ...payload,
          };
        } else {
          state.customerFormInfo = payload;
        }
      }
    ),
  }),
});

export const customerSliceActions = customerSlice.actions;
export const { customerFormInfo } = customerSlice.selectors;
