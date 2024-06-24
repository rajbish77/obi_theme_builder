import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import loginSlice from "../slices/logIn-slice";
import authSlice from "../slices/authSlice";
import editorSlice from "../slices/editor/editorSlice";
import editorWindoSlive from "../slices/editor/editorWindoSlive";



const rootReducter = combineReducers({
  logIn: loginSlice,
  auth: authSlice,
  editor: editorSlice,
  editorWindo: editorWindoSlive
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["logIn"],
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
