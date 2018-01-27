import { LOAD_TIMETRACK } from './timetrack.action';

const items = [];

export const timetrackReducer = (state = { items }, action) => {
  switch (action.type) {
    case LOAD_TIMETRACK:
      return { ...state, ...{ items: action.payload.timetracks } };
    default:
      return state;
  }
};
