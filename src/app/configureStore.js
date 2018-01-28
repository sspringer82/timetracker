import { createStore, combineReducers, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { timetrackReducer } from '../timetrack/timetrack.reducer';

import { addTimetrackEpic } from '../timetrack/timetrack.epic';
import { loadTimetrack } from '../timetrack/timetrack.action';

const rootReducer = combineReducers({ timetrack: timetrackReducer });
const epicMiddleware = createEpicMiddleware(combineEpics(addTimetrackEpic));

export const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

  fetch('/timetrack')
    .then(data => data.json())
    .then(data => {
      store.dispatch(loadTimetrack(data));
    });

  return store;
};
