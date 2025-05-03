import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authApi } from '@features/auth';
// If you have more reducers, import them here

const persistConfig = {
  key: "root",
  storage,
};

const appReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  // Add other reducers here
});

// RESET redux state on logout
const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: any
) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware);
  },
});

export const persistor = persistStore(store);

// Infer types from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
