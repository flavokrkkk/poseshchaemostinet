import { routes } from "@/pages/routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { queryClient } from "../api";
import { Provider } from "react-redux";
import { store } from "../lib";
import ModalProvider from "./modalProvider";
import { DrawerProvider } from "./drawerProvider";
import { ViewerProvider } from "@/entities/viewer/model/context/providers";

export const Providers = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ViewerProvider>
        <RouterProvider router={routes} />
        <ModalProvider />
        <DrawerProvider />
      </ViewerProvider>
    </Provider>
  </QueryClientProvider>
);
