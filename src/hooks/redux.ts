import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, Dispatch } from "../redux/store";

const useAppDispatch: () => Dispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {
  useAppDispatch,
  useAppSelector
}