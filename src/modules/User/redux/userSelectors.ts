import { UserState } from "./userReducer";

export const selectUsers = (state: { user: UserState }) => state.user.users;
export const selectIsLoading = (state: { user: UserState }) => state.user.isLoading;
export const selectLoadFailed = (state: { user: UserState }) => state.user.loadFailed;
export const selectLoadSucceeded = (state: { user: UserState }) => state.user.loadSucceeded;
