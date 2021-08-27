// ***** Store.js ******

import { combineReducers, createStore } from "redux";
import classReducer from "./classReducer";
import studentReducer from "./studentReducer";
import limitReducer from "./limitReducer";
import newsReducer from "./newsReducer";
// Redux Persist
import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
// This will hard set incoming state.
import hardSet from "redux-persist/lib/stateReconciler/hardSet";

const reducer = combineReducers({
  classes: classReducer,
  students: studentReducer,
  dailyLimit: limitReducer,
  news: newsReducer,
});

// Redux Persist
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  stateReconciler: hardSet,
};
const persistedReducer = persistReducer(persistConfig, reducer);

// *** JUST Redux ***
// const store = createStore(reducer);
// export default store;

// Testing
// const store = createStore(reducer);
// const store = createStore(persistedReducer);
// let persistor = persistStore(store);
// export default { store, persistor };

export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};
