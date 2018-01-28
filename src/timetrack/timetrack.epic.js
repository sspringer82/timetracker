import { mergeMap } from 'rxjs/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import { ADD_TIMETRACK, addTimetrackSuccess } from './timetrack.action';

export const addTimetrackEpic = action$ => {
  return action$.ofType(ADD_TIMETRACK).pipe(
    mergeMap(action => {
      Observable.fromPromise(
        fetch('/timetrack', { method: 'post', body: action.payload }),
      ).map(response => addTimetrackSuccess(response));
    }),
  );
};
