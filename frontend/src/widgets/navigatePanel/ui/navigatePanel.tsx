import { Button } from "@/shared";
import { navigateOptions } from "../libs/navigateOptions";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

export const NavigatePanel = () => {
  const { pathname } = useLocation();
  const pathArray = pathname.split("/");
  const pathId = pathArray[pathArray.length - 1];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white shadow-md flex space-x-2 p-2 rounded-2xl">
      {navigateOptions.map((option) => (
        <Link key={option.id} to={option.path}>
          <Button
            variant={"outline"}
            className={clsx(
              "shadow-none",
              option.pathSelect(pathId).includes(pathname) &&
                "bg-blue-400 text-white hover:bg-black/85 hover:text-white"
            )}
          >
            {option.icon}
          </Button>
        </Link>
      ))}
    </div>
  );
};
