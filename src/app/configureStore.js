import { createStore, combineReducers, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { timetrackReducer } from '../timetrack/timetrack.reducer';

import {
  addTimetrackEpic,
  addTimetrackSuccessEpic,
  deleteTimetrackEpic,
} from '../timetrack/timetrack.epic';
import { loadTimetrack } from '../timetrack/timetrack.action';

const rootReducer = combineReducers({
  timetrack: timetrackReducer,
  router: routerReducer,
});

const epicMiddleware = createEpicMiddleware(
  combineEpics(addTimetrackEpic, addTimetrackSuccessEpic, deleteTimetrackEpic),
);

export const history = createHistory();
const middleware = routerMiddleware(history);

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(middleware, epicMiddleware),
  );

  fetch('/timetrack')
    .then(data => data.json())
    .then(data => {
      store.dispatch(loadTimetrack(data));
    });

  return store;
};
