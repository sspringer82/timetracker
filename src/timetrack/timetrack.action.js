export const LOAD_TIMETRACK = 'LOAD_TIMETRACK';
export const ADD_TIMETRACK = 'ADD_TIMETRACK';
export const ADD_TIMETRACK_SUCCESS = 'ADD_TIMETRACK_SUCCESS';

export const loadTimetrack = timetracks => ({
  type: LOAD_TIMETRACK,
  payload: {
    timetracks,
  },
});

export const addTimetrack = timetrack => ({
  type: ADD_TIMETRACK,
  payload: {
    timetrack,
  },
});

export const addTimetrackSuccess = timetrack => ({
  type: ADD_TIMETRACK_SUCCESS,
  payload: {
    timetrack,
  },
});
