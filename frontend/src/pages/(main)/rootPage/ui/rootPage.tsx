import { Header } from "@/widgets/header/ui/header";
import { LoadingWidget } from "@/widgets/loadingWidget/ui/loadingWidget";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const RootPage = () => {
  return (
    <Suspense fallback={<LoadingWidget />}>
      <div className="h-screen py-5 px-4 md:px-8 relative transition-all duration-300 ease-in-out">
        <Header />
        <main
          style={{ height: "calc(100% - 24px)" }}
          className="w-full h-full py-3 transition-opacity duration-300"
        >
          <Outlet />
          {/* </motion.div> */}
        </main>
      </div>
    </Suspense>
  );
};

export default RootPage;
