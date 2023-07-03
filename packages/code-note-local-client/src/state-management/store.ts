import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import { saveCellsMiddleWare } from "./middlewares/savecells-middleware";

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveCellsMiddleWare),
});
