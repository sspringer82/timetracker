import { mergeMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { push } from 'react-router-redux';
import 'rxjs/add/observable/fromPromise';
import {
  ADD_TIMETRACK,
  ADD_TIMETRACK_SUCCESS,
  DELETE_TIMETRACK,
  addTimetrackSuccess,
  deleteTimetrackSuccess,
} from './timetrack.action';

export const addTimetrackEpic = action$ =>
  action$.ofType(ADD_TIMETRACK).pipe(
    mergeMap(action => {
      const data = action.payload.timetrack;
      delete data.id;

      return Observable.fromPromise(
        fetch('/timetrack', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }),
      ).pipe(map(response => addTimetrackSuccess(response)));
    }),
  );

export const addTimetrackSuccessEpic = action$ =>
  action$.ofType(ADD_TIMETRACK_SUCCESS).pipe(map(() => push('/list')));

export const deleteTimetrackEpic = action$ =>
  action$.ofType(DELETE_TIMETRACK).pipe(
    mergeMap(action => {
      const data = action.payload.timetrack;

      return Observable.fromPromise(
        fetch(`/timetrack/${data.id}`, {
          method: 'delete',
        }),
      ).pipe(map(() => deleteTimetrackSuccess(action.payload.timetrack)));
    }),
  );

// @todo combine epics here
