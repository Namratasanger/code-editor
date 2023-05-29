import { Dispatch } from "redux";
import { Actions } from "../actions";
import { ActionType } from "../action-types";
import { saveCells } from "../action-creators";
import { RootState } from "../reducers";

export const saveCellsMiddleWare = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Actions>;
  getState: () => RootState;
}) => {
  let timer: any;
  return (next: (action: Actions) => void) => (action: Actions) => {
    next(action);
    if (
      [
        ActionType.MOVE_CELL,
        ActionType.UPDATE_CELL,
        ActionType.INSERT_CELL_AFTER,
        ActionType.DELETE_CELL,
      ].includes(action.type)
    ) {
      // debouncing the save cells
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        saveCells()(dispatch, getState);
      }, 1000);
    }
  };
};
