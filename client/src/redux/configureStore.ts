import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer from './user-slice/userSlice';

const rootReducer = combineReducers({
  userStore: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
