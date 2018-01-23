const items = [
  {
    id: 1,
    start: 1516705200000,
    end: 1516708800000,
    project: 'Test project',
    task: 'Test task',
  },
];

export const timetrackReducer = (state = { items: items }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
