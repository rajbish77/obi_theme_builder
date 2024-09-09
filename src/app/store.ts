import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { createTransform, persistReducer, persistStore } from "redux-persist";
import loginSlice from "../slices/auth-slice";
import editorSlice from "../slices/editor/editorSlice";
// import themeSlice from "../state/themeSlice";
import editorWindowSlice, { EditorWindowState } from "../slices/editor/editorWindowSlice";
import publisherSlice from "../slices/publisher/publisherSlice";
import buttonSlice from "../slices/publisher/publishTheme";
import rejButtonSlice from "../slices/publisher/rejectTheme";
import affiliateSlice from "../slices/affiliateTheme";
import affiliateName from "../slices/affiliateName";
import fetchAffiliate from "../slices/commonSlice/fetchAffiliate";
import preview from "../slices/commonSlice/preview";
import updateThemeSlice from "../slices/updateThemeSlice";
import themeSlice from "../slices/commonSlice/themeSlice";


const rootReducter = combineReducers({
  logIn: loginSlice, // Login api work slice
  editor: editorSlice,
  editorWindow: editorWindowSlice,
  // theme: themeSlice,
  publish: publisherSlice, // Publicer api work slice
  buttonWork: buttonSlice, // button publicer function work slice
  rejuctButton: rejButtonSlice, // button rejuct function work slice
  affiliateData: affiliateSlice, // affiliate api work slice
  affiliateName: affiliateName, // affiliate name and id
  fetchAffiliate: fetchAffiliate, // this is fetch Affiliate 
  preview: preview, // this is preview them work
  updateTheme: updateThemeSlice, // this is update api work
  theme: themeSlice // update the Theme
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["logIn", "affiliateData", "fetchAffiliate", "preview", "live",  "defaultThemeOptions"],
  // transforms:[selectDataTransform]
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
