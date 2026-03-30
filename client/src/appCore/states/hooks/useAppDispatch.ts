import { useDispatch } from "react-redux";
import { AppDispatch } from "../stores/Store";

export const useAppDispatch = () => useDispatch<AppDispatch>();