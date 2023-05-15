import { ActionType } from "../action-types";
import {
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAfterAction,
} from "../actions";
import { CellTypes, Direction } from "../cell";

export const updateCell = (id: string, newData: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      data: newData,
    },
  };
};

export const deleteCell = (id): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: {
      id,
    },
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};
export const insertCellAfter = (
  id: string | null,
  type: CellTypes
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type,
    },
  };
};
