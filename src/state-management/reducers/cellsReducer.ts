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
    case ActionType.MOVE_CELL: {
      const { id, direction } = action.payload;
      let index = state.order.findIndex((data) => data === id);
      let targetIndex = direction === "up" ? index - 1 : index + 1;

      // validate the target index is not going out of bound
      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return;
      }
      // swap the values based on the direction
      let newOrder = [...state.order];
      newOrder[index] = newOrder[targetIndex];
      newOrder[targetIndex] = id;

      return {
        ...state,
        order: [...newOrder],
      };
    }
    case ActionType.UPDATE_CELL: {
      const { id, data } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          [id]: {
            ...state.data[id],
            data,
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
    case ActionType.INSERT_CELL_BEFORE: {
      const { id, type } = action.payload;

      // generate the cell data
      const cellData: CellProperties = {
        data: "",
        type,
        id: cellIdentifier(),
      };
      // add the cell before the given id or if id is null then add the cell at the very end
      const index = state.order.findIndex((data) => data === id);
      let newOrder = [...state.order];
      if (index < 0) {
        newOrder.push(cellData.id);
      } else {
        newOrder.splice(index, 0, cellData.id);
      }
      return {
        ...state,
        order: [...newOrder],
        data: {
          ...state.data,
          [cellData.id]: cellData,
        },
      };
    }
    default:
      return state;
  }
};

const cellIdentifier: () => string = (): string => {
  return Math.random().toString(36).substr(2, 5);
};
export default cellReducer;
