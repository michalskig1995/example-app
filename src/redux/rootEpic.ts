import { combineEpics } from "redux-observable";
import { loadUsersEpic } from "../modules/User/redux";
import { UserActionTypes } from "../modules/User/redux/userActions";

export const rootEpic = combineEpics<UserActionTypes>(loadUsersEpic);
