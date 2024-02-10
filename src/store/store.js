import { createStore, combineReducers } from "redux";
import tabReducer from "./tab/reducers";
import sbnReducer from "./sbn/reducers";
import dialogReducer from "./dialog/reducers";

const rootReducer = combineReducers({
  tab: tabReducer,
  sbn: sbnReducer,
  dialog: dialogReducer
});

const store = createStore(rootReducer);

export default store;
