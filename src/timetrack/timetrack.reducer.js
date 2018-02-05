import {
  LOAD_TIMETRACK,
  DELETE_TIMETRACK_SUCCESS,
  ADD_TIMETRACK_SUCCESS,
} from './timetrack.action';

const items = [];

export const timetrackReducer = (state = { items }, action) => {
  let cloneItems;
  let cloneState;
  let index;
  switch (action.type) {
    case LOAD_TIMETRACK:
      return { ...state, ...{ items: action.payload.timetracks } };
    case ADD_TIMETRACK_SUCCESS:
      cloneItems = [...state.items];
      cloneItems.push(action.payload.timetrack);
      cloneState = { ...state, ...{ items: cloneItems } };
      return cloneState;
    case DELETE_TIMETRACK_SUCCESS:
      cloneItems = [...state.items];
      cloneState = { ...state, ...{ items: cloneItems } };
      index = cloneState.items.findIndex(
        item => item.id === action.payload.timetrack.id,
      );
      cloneState.items.splice(index, 1);
      return cloneState;
    default:
      return state;
  }
};
