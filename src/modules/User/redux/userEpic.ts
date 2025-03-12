import { ofType } from "redux-observable";
import { Observable, of, from } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { types, loadUsersSuccess, loadUsersFailure } from "./";
import { getUsers } from "../api";
import type { UserActionTypes } from "./userActions";

export const loadUsersEpic = (action$: Observable<UserActionTypes>) =>
  action$.pipe(
    ofType(types.LOAD_USERS),
    mergeMap(() =>
      from(getUsers()).pipe(
        map((users) => loadUsersSuccess(users)),
        catchError((error) => of(loadUsersFailure(error.message)))
      )
    )
  );
