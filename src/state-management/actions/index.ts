import { ActionType } from "../action-types";
import { CellTypes, Direction } from "../cell";

// Reorder a cell
export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction; // move upwards or downwards
  };
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: {
    id: string;
  };
}

export interface InsertCellAfterAction {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellTypes;
  };
}

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    data: string;
  };
}

export interface BundleStartAction {
  type: ActionType.BUNDLE_START;
  payload: {
    cellId: string;
  };
}

export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      error: string;
    };
  };
}

export type Actions =
  | MoveCellAction
  | UpdateCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | BundleCompleteAction
  | BundleStartAction;
