import { Action } from "redux";
import { User } from "../types/User";

export const types = {
  LOAD_USERS: "LOAD_USERS",
  LOAD_USERS_SUCCESS: "LOAD_USERS_SUCCESS",
  LOAD_USERS_FAILURE: "LOAD_USERS_FAILURE",
  ADD_USER: "ADD_USER",
  EDIT_USER: "EDIT_USER",
  DELETE_USER: "DELETE_USER",
} as const;

interface LoadUsersAction extends Action {
  type: typeof types.LOAD_USERS;
}

interface LoadUsersSuccessAction extends Action {
  type: typeof types.LOAD_USERS_SUCCESS;
  payload: User[];
}

interface LoadUsersFailureAction extends Action {
  type: typeof types.LOAD_USERS_FAILURE;
  payload: string;
}

interface AddUserAction extends Action {
  type: typeof types.ADD_USER;
  payload: User;
}

interface EditUserAction extends Action {
  type: typeof types.EDIT_USER;
  payload: User;
}

interface DeleteUserAction extends Action {
  type: typeof types.DELETE_USER;
  payload: number;
}

export type UserActionTypes =
  | LoadUsersAction
  | LoadUsersSuccessAction
  | LoadUsersFailureAction
  | AddUserAction
  | EditUserAction
  | DeleteUserAction;

export const loadUsers = (): Action<typeof types.LOAD_USERS> => ({
  type: types.LOAD_USERS,
});
export const loadUsersSuccess = (users: User[]): LoadUsersSuccessAction => ({
  type: types.LOAD_USERS_SUCCESS,
  payload: users,
});
export const loadUsersFailure = (error: string): LoadUsersFailureAction => ({
  type: types.LOAD_USERS_FAILURE,
  payload: error,
});

export const addUser = (user: User): AddUserAction => ({
  type: types.ADD_USER,
  payload: user,
});
export const editUser = (user: User): EditUserAction => ({
  type: types.EDIT_USER,
  payload: user,
});
export const deleteUser = (userId: number): DeleteUserAction => ({
  type: types.DELETE_USER,
  payload: userId,
});
