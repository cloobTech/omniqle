import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authApi } from "@features/auth";
import { classApi } from "@features/classes";
import { userApi } from "@features/users";
import modalReducer from "@src/slice/modal";
import { setupListeners } from "@reduxjs/toolkit/query";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [authApi.reducerPath, classApi.reducerPath, userApi.reducerPath],
};

const appReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [classApi.reducerPath]: classApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  modal: modalReducer,
});

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
    }).concat(authApi.middleware, classApi.middleware, userApi.middleware);
  },
});

export const persistor = persistStore(store);

// ✅ This enables refetchOnFocus/refetchOnReconnect features in RTK Query
setupListeners(store.dispatch);

// Infer types from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
