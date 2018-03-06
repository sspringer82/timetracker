import { mergeMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { push } from 'react-router-redux';
import 'rxjs/add/observable/fromPromise';
import {
  ADD_TIMETRACK,
  ADD_TIMETRACK_SUCCESS,
  UPDATE_TIMETRACK,
  DELETE_TIMETRACK,
  addTimetrackSuccess,
  deleteTimetrackSuccess,
  updateTimetrackSuccess,
  UPDATE_TIMETRACK_SUCCESS,
} from './timetrack.action';

export const addTimetrackEpic = action$ =>
  action$.ofType(ADD_TIMETRACK).pipe(
    mergeMap(action => {
      const data = action.payload;
      delete data.id;

      return Observable.fromPromise(
        fetch('/timetrack', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }),
      ).pipe(
        mergeMap(response => Observable.fromPromise(response.json())),
        map(response => addTimetrackSuccess(response)),
      );
    }),
  );

export const addTimetrackSuccessEpic = action$ =>
  action$.ofType(ADD_TIMETRACK_SUCCESS).pipe(map(() => push('/list')));

export const updateTimetrackEpic = action$ =>
  action$.ofType(UPDATE_TIMETRACK).pipe(
    mergeMap(action => {
      const data = action.payload;

      return Observable.fromPromise(
        fetch(`/timetrack/${data.id}`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }),
      ).pipe(
        mergeMap(response => Observable.fromPromise(response.json())),
        map(response => updateTimetrackSuccess(response)),
      );
    }),
  );

export const updateTimetrackSuccessEpic = action$ =>
  action$.ofType(UPDATE_TIMETRACK_SUCCESS).pipe(map(() => push('/list')));

export const deleteTimetrackEpic = action$ =>
  action$.ofType(DELETE_TIMETRACK).pipe(
    mergeMap(action => {
      const data = action.payload;

      return Observable.fromPromise(
        fetch(`/timetrack/${data.id}`, {
          method: 'delete',
        }),
      ).pipe(map(() => deleteTimetrackSuccess(data)));
    }),
  );

// @todo combine epics here
