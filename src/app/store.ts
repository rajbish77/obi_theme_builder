import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { createTransform, persistReducer, persistStore } from "redux-persist";
import loginSlice from "../slices/logIn-slice";
import editorSlice from "../slices/editor/editorSlice";
import themeSlice from "../state/themeSlice";
import editorWindowSlice, { EditorWindowState } from "../slices/editor/editorWindowSlice";
import publisherSlice from "../slices/publisher/publisherSlice";
import buttonSlice from "../slices/publisher/buttonFunctionSlice";
import rejButtonSlice from "../slices/publisher/buttonFunctionRej";
import affiliateSlice from "../slices/affiliateTheme";
import affiliateName from "../slices/affiliateName";
import fetchAffiliate from "../slices/Common Slice/fetchAffiliate";
import preview from "../slices/Common Slice/preview";


const rootReducter = combineReducers({
  logIn: loginSlice, // Login api work slice
  editor: editorSlice,
  editorWindow: editorWindowSlice,
  theme: themeSlice,
  publish: publisherSlice, // Publicer api work slice
  buttonWork: buttonSlice, // button publicer function work slice
  rejuctButton: rejButtonSlice, // button rejuct function work slice
  affiliateData : affiliateSlice, // affiliate api work slice
  affiliateName: affiliateName, // affiliate name and id
  fetchAffiliate: fetchAffiliate, // this is fetch Affiliate 
  preview:preview, // this is preview them work
});

// const selectDataTransform = createTransform(
//   (inboundState: any, key) => {
//     // Modify the state you want to persist
//     if (key === 'affiliateData') {
//       return {
//         affiliateId: inboundState.affiliateId,
//       };
//     }
//     return inboundState;
//   }
// );

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["logIn", "affiliateData" , "fetchAffiliate", "preview" ],
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
