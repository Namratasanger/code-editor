import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import { ActionType } from "./action-types";

export const store = configureStore({ reducer: reducers });

store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: "code",
    data: "// Write your code here",
  },
});

store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: "text",
    data: "Readme file",
  },
});
