import { combineReducers } from "redux";
import cellReducer from "./cellsReducer";
import bundlesReducers from "./bundlesReducer";

const reducers = combineReducers({
  cells: cellReducer,
  bundles: bundlesReducers,
});
export default reducers;

export type RootState = ReturnType<typeof reducers>;
