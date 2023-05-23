import { ActionType } from "../action-types";
import { Actions } from "../actions";

// what state you want to return with the bundle reducer
interface BundleState {
  // the key will be cell id
  [key: string]:
    | {
        loading: boolean;
        code: string;
        error: string;
      }
    | undefined;
}

const initialState: BundleState = {};

const bundlesReducer = (
  state: BundleState = initialState,
  action: Actions
): BundleState => {
  switch (action.type) {
    case ActionType.BUNDLE_START: {
      let currentCell = state[action.payload.cellId];
      currentCell = {
        loading: true,
        code: "",
        error: "",
      };
      return {
        ...state,
        [action.payload.cellId]: currentCell,
      };
    }
    case ActionType.BUNDLE_COMPLETE: {
      const {
        bundle: { code, error },
      } = action.payload;
      let currentCell = state[action.payload.cellId];
      currentCell = {
        loading: false,
        code,
        error,
      };
      return {
        ...state,
        [action.payload.cellId]: currentCell,
      };
    }
    default: {
      return state;
    }
  }
};

export default bundlesReducer;
