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
import commonWork from "../slices/commonSlice";
import affiliateTheme from "../slices/affiliateTheme";


const rootReducter = combineReducers({
  logIn: loginSlice, // Login api work slice
  editor: editorSlice,
  editorWindow: editorWindowSlice,
  theme: themeSlice,
  publish: publisherSlice, // Publicer api work slice
  buttonWork: buttonSlice, // button publicer function work slice
  rejuctButton: rejButtonSlice, // button rejuct function work slice
  affiliateData : affiliateTheme, // affiliate api work slice
  affiliate: commonWork,
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
