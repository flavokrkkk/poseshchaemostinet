import { useSelector } from "react-redux";
import { RootState } from "../lib";

export const useAppSelector = useSelector.withTypes<RootState>();
