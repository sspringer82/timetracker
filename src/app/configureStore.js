import { createStore, combineReducers } from 'redux';
import { timetrackReducer } from '../timetrack/timetrack.reducer';

const rootReducer = combineReducers({ timetrack: timetrackReducer });

export const configureStore = () => {
  const store = createStore(rootReducer);
  return store;
};
