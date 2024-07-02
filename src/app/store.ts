import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import loginSlice from "../slices/logIn-slice";
import editorSlice from "../slices/editor/editorSlice";
import themeSlice from "../state/themeSlice";
import editorWindowSlice from "../slices/editor/editorWindowSlice";
import publisherSlice from "../slices/publisher/publisherSlice";
import buttonSlice from "../slices/publisher/buttonFunctionSlice";
import rejButtonSlice from "../slices/publisher/buttonFunctionRej"


const rootReducter = combineReducers({
  logIn: loginSlice,
  editor: editorSlice,
  editorWindow: editorWindowSlice,
  theme: themeSlice,
  publish: publisherSlice,
  buttonWork: buttonSlice, // button function work
  rejuctButton: rejButtonSlice
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
