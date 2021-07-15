import { historiesActiontype } from "@/actions/history.action";

interface Histories {
  isLoading: boolean;
  isError: boolean;
  histories: any[];
}

const initalState: Histories = {
  isLoading: false,
  isError: false,
  histories: [],
};

const historiesReducer = (state = initalState, action) => {
  switch (action.type) {
    case historiesActiontype.LOADING_HISTORIES:
      return {
        ...state,
        isLoading: true,
        isError: false,
        histories: [],
      };

    case historiesActiontype.LOADING_HISTORIES_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        histories: [],
      };

    case historiesActiontype.LOADING_HISTORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        histories: action.payload,
      };

    default:
      return state;
  }
};

export default historiesReducer;
