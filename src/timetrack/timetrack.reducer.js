import { LOAD_TIMETRACK, DELETE_TIMETRACK_SUCCESS } from './timetrack.action';

const items = [];

export const timetrackReducer = (state = { items }, action) => {
  switch (action.type) {
    case LOAD_TIMETRACK:
      return { ...state, ...{ items: action.payload.timetracks } };
    case DELETE_TIMETRACK_SUCCESS:
      const cloneState = { ...state };
      const index = cloneState.items.findIndex(
        item => item.id === action.payload.timetrack.id,
      );
      cloneState.items.splice(index, 1);
      return cloneState;
    default:
      return state;
  }
};
