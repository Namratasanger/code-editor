import { ActionType } from "../action-types";
import axios from "axios";
import {
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAfterAction,
  Actions,
} from "../actions";
import { CellProperties, CellTypes, Direction } from "../cell";
import { Dispatch } from "redux";
import bundle from "../../bundler/index";
import { RootState } from "../reducers";

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

export const createBundle = (id: string, inputCode: string) => {
  return async (dispatch: Dispatch<Actions>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId: id,
      },
    });

    const result = await bundle(inputCode);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId: id,
        bundle: {
          ...result,
        },
      },
    });
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Actions>) => {
    dispatch({
      type: ActionType.FETCH_CELLS,
    });
    try {
      const {
        status,
        cellList = [],
        message = "Successfully fetched the list of cells",
      }: {
        status: number;
        cellList: CellProperties[];
        message: string;
      } = await axios.get("/cells");

      if (status === 200) {
        dispatch({ type: ActionType.FETCH_CELLS_COMPLETE, payload: cellList });
      } else {
        dispatch({
          type: ActionType.FETCH_CELLS_ERROR,
          payload: {
            status,
            message,
          },
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: ActionType.FETCH_CELLS_ERROR,
        payload: {
          status: 422,
          message: `Some error occurred while fetching the cells. More error information : ${err.messgae}`,
        },
      });
    }
  };
};

export const saveCells =
  () => async (dispatch: Dispatch<Actions>, getState: () => RootState) => {
    const {
      cells: { data, order },
    } = getState();

    const cells: CellProperties[] = order.map((id) => data[id]);
    console.log("Save cells : ", cells);
    try {
      await axios.post("/cells", { cells });
    } catch (err) {
      dispatch({
        type: ActionType.SAVE_CELLS_ERROR,
        payload: {
          message: `Something went wrong. More information : ${err.message}`,
        },
      });
    }
  };
