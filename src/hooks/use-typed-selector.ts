import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../state-management";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
