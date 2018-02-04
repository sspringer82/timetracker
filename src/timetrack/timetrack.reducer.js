import {
  LOAD_TIMETRACK,
  DELETE_TIMETRACK_SUCCESS,
  ADD_TIMETRACK_SUCCESS,
} from './timetrack.action';

const items = [];

export const timetrackReducer = (state = { items }, action) => {
  switch (action.type) {
    case LOAD_TIMETRACK:
      return { ...state, ...{ items: action.payload.timetracks } };
    case ADD_TIMETRACK_SUCCESS:
      // @todo handle response body + insert it into state
      return state;
    case DELETE_TIMETRACK_SUCCESS:
      const cloneItems = [...items];
      const cloneState = { ...state, ...{ items: cloneItems } };
      const index = cloneState.items.findIndex(
        item => item.id === action.payload.timetrack.id,
      );
      cloneState.items.splice(index, 1);
      return cloneState;
    default:
      return state;
  }
};
