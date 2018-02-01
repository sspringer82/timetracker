import { createStore, combineReducers, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { timetrackReducer } from '../timetrack/timetrack.reducer';

import {
  addTimetrackEpic,
  deleteTimetrackEpic,
} from '../timetrack/timetrack.epic';
import { loadTimetrack } from '../timetrack/timetrack.action';

const rootReducer = combineReducers({ timetrack: timetrackReducer });
const epicMiddleware = createEpicMiddleware(
  combineEpics(addTimetrackEpic, deleteTimetrackEpic),
);

export const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

  fetch('/timetrack')
    .then(data => data.json())
    .then(data => {
      store.dispatch(loadTimetrack(data));
    });

  return store;
};
