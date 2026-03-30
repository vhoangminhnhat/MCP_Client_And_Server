import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../stores/Store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;