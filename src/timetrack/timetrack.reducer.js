import {
  LOAD_TIMETRACK,
  DELETE_TIMETRACK_SUCCESS,
  ADD_TIMETRACK_SUCCESS,
  UPDATE_TIMETRACK_SUCCESS,
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
      cloneItems.push(action.payload);
      return cloneItems;
    case UPDATE_TIMETRACK_SUCCESS:
      cloneItems = [...state];
      const index = cloneItems.findIndex(item => item.id === action.payload.id);
      cloneItems[index] = action.payload;
      return cloneItems;
    case DELETE_TIMETRACK_SUCCESS:
      return state.filter(item => item.id !== action.payload.id);
    default:
      return state;
  }
};
