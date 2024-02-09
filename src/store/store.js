import { createStore, combineReducers } from "redux";
import tabReducer from "./tab/reducers";
import sbnReducer from "./sbn/reducers";

const rootReducer = combineReducers({
  tab: tabReducer,
  sbn: sbnReducer,
});

const store = createStore(rootReducer);

export default store;
