import { mergeMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { ADD_TIMETRACK, addTimetrackSuccess } from './timetrack.action';

export const addTimetrackEpic = action$ => {
  return action$.ofType(ADD_TIMETRACK).pipe(
    mergeMap(action => {
      const data = action.payload.timetrack;
      delete data.id;

      return Observable.fromPromise(
        fetch('/timetrack', {
          method: 'post',
          body: JSON.stringify(data),
        }),
      ).pipe(map(response => addTimetrackSuccess(response)));
    }),
  );
};
