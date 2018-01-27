export const LOAD_TIMETRACK = 'LOAD_TIMETRACK';

export const loadTimetrack = timetracks => ({
  type: LOAD_TIMETRACK,
  payload: {
    timetracks,
  },
});
