import { createStore as reduxCreateStore, applyMiddleware } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage for web
import {thunk} from "redux-thunk"
import themeSlice from "./themeSlice"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["id","themeId", "themeOptions", "savedThemes", "auth" ,"affiliate", "editorThemeState", "affiliateTheme"],
}

// in production, persist the mobileWarningSeen value so mobile users don't see the popup again on reload
if (process.env.NODE_ENV === "production") {
  persistConfig.whitelist.push("mobileWarningSeen")
}

const persistedReducer = persistReducer(persistConfig, themeSlice)

export default () => {
  let store = reduxCreateStore(persistedReducer, applyMiddleware(thunk))
  let persistor = persistStore(store)
  // persistor.purge()
  return { store, persistor }
}
