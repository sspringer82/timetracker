import {
  LOAD_TIMETRACK,
  DELETE_TIMETRACK_SUCCESS,
  ADD_TIMETRACK_SUCCESS,
} from './timetrack.action';

const timetrack = [];

export const timetrackReducer = (state = timetrack, action) => {
  let cloneItems;
  let cloneState;
  let index;
  switch (action.type) {
    case LOAD_TIMETRACK:
      return action.payload;
    case ADD_TIMETRACK_SUCCESS:
      cloneItems = [...state];
      cloneItems.push(action.payload.timetrack);
      return cloneItems;
    case DELETE_TIMETRACK_SUCCESS:
      cloneItems = [...state.items];
      index = cloneState.items.findIndex(
        item => item.id === action.payload.timetrack.id,
      );
      cloneItems.splice(index, 1);
      return cloneItems;
    default:
      return state;
  }
};
