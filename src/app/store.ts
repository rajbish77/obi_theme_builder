import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import loginWork from "../slices/logInPage";


interface LoginState {
    logIn: string;
    logOut: string;
    email: string;
    password: string;
    auth: boolean;
    editor: string;
    publisher: string;
    userName: string;
  }
  
  interface RootState {
    logIn: LoginState;
  }

const rootReducter = combineReducers({
  logIn: loginWork,
});


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["logIn"]
};

const presistReducter = persistReducer(persistConfig, rootReducter);

export const store = configureStore({
  reducer: presistReducter,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type { RootState };