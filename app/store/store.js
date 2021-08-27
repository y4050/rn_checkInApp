// ***** Store.js ******

import { combineReducers, createStore } from "redux";
import classReducer from "./classReducer";
import studentReducer from "./studentReducer";
import limitReducer from "./limitReducer";
import newsReducer from "./newsReducer";
import idReducer from "./idReducer";
import userReducer from "./userReducer";
import passReducer from "./passReducer";

// Redux Persist
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import storage from "redux-persist/lib/storage";

const reducer = combineReducers({
  classes: classReducer,
  students: studentReducer,
  dailyLimit: limitReducer,
  news: newsReducer,
  lastId: idReducer,
  isLoggedIn: userReducer,
  pass: passReducer,
});

// Redux Persist
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, reducer);

// *** JUST Redux ***
const store = createStore(persistedReducer);

export const persistor = persistStore(store);

export default store;

// export default () => {
//   let store = createStore(persistedReducer);
//   let persistor = persistStore(store);
//   return { store, persistor };
// };
