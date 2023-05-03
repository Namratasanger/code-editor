import { ActionType } from "../action-types";
import { Actions } from "../actions";
import { CellProperties } from "../cell";

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: CellProperties;
  };
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellReducer = (
  state: CellState = initialState,
  action: Actions
): CellState => {
  switch (action.type) {
    case ActionType.MOVE_CELL:
      return state;
    case ActionType.UPDATE_CELL: {
      const { id, data } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          [id]: {
            ...state.data[id],
            data: data,
          },
        },
      };
    }
    case ActionType.DELETE_CELL: {
      let { id } = action.payload;
      let newData = { ...state.data };
      delete newData[id];
      let newOrder = [...state.order].filter((value) => id !== value);
      return {
        ...state,
        order: {
          ...newOrder,
        },
        data: {
          ...newData,
        },
      };
    }
    case ActionType.INSERT_CELL_BEFORE:
      return state;
    default:
      return state;
  }
};

export default cellReducer;
