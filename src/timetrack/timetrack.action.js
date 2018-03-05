export const LOAD_TIMETRACK = 'LOAD_TIMETRACK';
export const ADD_TIMETRACK = 'ADD_TIMETRACK';
export const ADD_TIMETRACK_SUCCESS = 'ADD_TIMETRACK_SUCCESS';
export const DELETE_TIMETRACK = 'DELETE_TIMETRACK';
export const DELETE_TIMETRACK_SUCCESS = 'DELETE_TIMETRACK_SUCCESS';
export const UPDATE_TIMETRACK = 'UPDATE_TIMETRACK';
export const UPDATE_TIMETRACK_SUCCESS = 'UPDATE_TIMETRACK_SUCCESS';

export const loadTimetrack = timetracks => ({
  type: LOAD_TIMETRACK,
  payload: timetracks,
});

export const addTimetrack = timetrack => ({
  type: ADD_TIMETRACK,
  payload: timetrack,
});

export const addTimetrackSuccess = timetrack => ({
  type: ADD_TIMETRACK_SUCCESS,
  payload: timetrack,
});

export const deleteTimetrack = timetrack => ({
  type: DELETE_TIMETRACK,
  payload: timetrack,
});

export const deleteTimetrackSuccess = timetrack => ({
  type: DELETE_TIMETRACK_SUCCESS,
  payload: timetrack,
});

export const updateTimetrack = timetrack => ({
  type: UPDATE_TIMETRACK,
  payload: timetrack,
});

export const updateTimetrackSuccess = timetrack => ({
  type: UPDATE_TIMETRACK_SUCCESS,
  payload: timetrack,
});
