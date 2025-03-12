import { types } from "./userActions";
import type { UserActionTypes } from "./userActions";
import type { User } from "../types/User";

export interface UserState {
  users: User[];
  isLoading: boolean;
  loadFailed: boolean;
  loadSucceeded: boolean;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  loadFailed: false,
  loadSucceeded: false,
};

const userReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case types.LOAD_USERS:
      return {
        ...state,
        isLoading: true,
        loadFailed: false,
        loadSucceeded: false,
      };

    case types.LOAD_USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload,
        isLoading: false,
        loadSucceeded: true,
      };
    }

    case types.LOAD_USERS_FAILURE:
      return { ...state, isLoading: false, loadFailed: true };

    case types.ADD_USER:
      return { ...state, users: [...state.users, action.payload] };

    case types.EDIT_USER: {
      const { payload } = action;
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === payload.id ? payload : user
        ),
      };
    }

    case types.DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };

    default:
      return state;
  }
};

export default userReducer;
