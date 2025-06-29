import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  REGISTER,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authApi } from "@features/auth";
import { classApi } from "@features/classes";
import { studentApi } from "@features/students";
import { userApi } from "@features/users";
import { verifyPersonApi } from "@features/verification";
import { paymentApi, bankReducer, invoiceReducer } from "@features/payments";
import modalReducer from "@src/slice/modal";
import navbarReducer from "@src/slice/navbar";
import schoolReducer from "@src/slice/school";
import { authReducer } from "@features/auth";
import { setupListeners } from "@reduxjs/toolkit/query";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["school", "invoices", "banks", "authentication"],
  blacklist: [
    authApi.reducerPath,
    classApi.reducerPath,
    userApi.reducerPath,
    studentApi.reducerPath,
    verifyPersonApi.reducerPath,
    paymentApi.reducerPath,
  ],
};
const appReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [classApi.reducerPath]: classApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [studentApi.reducerPath]: studentApi.reducer,
  [verifyPersonApi.reducerPath]: verifyPersonApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  modal: modalReducer,
  navbar: navbarReducer,
  school: schoolReducer,
  banks: bankReducer,
  invoice: invoiceReducer,
  authentication: authReducer,
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: any
) => {
  if (action.type === "authentication/logout") {
    // Clear all persisted state
    storage.removeItem("persist:root");
    state = undefined;
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      classApi.middleware,
      userApi.middleware,
      studentApi.middleware,
      verifyPersonApi.middleware,
      paymentApi.middleware
    ),
});

export const persistor = persistStore(store);

// ✅ This enables refetchOnFocus/refetchOnReconnect features in RTK Query
setupListeners(store.dispatch);

// Infer types from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
