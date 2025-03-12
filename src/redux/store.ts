import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer, rootEpic } from './';
import { UserActionTypes } from '../modules/User/redux';

const epicMiddleware = createEpicMiddleware<UserActionTypes>();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export default store;