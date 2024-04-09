import { CHANGE_TAB } from "./actions";

const initialState = {
  tab: localStorage.getItem("tab") || "view"
}

const tabReducer = (state = initialState, action)=> {
  switch(action.type) {
    case CHANGE_TAB: {
      return {
        ...state,
        tab: action.payload
      }
    }
    default: return state;
  }
}

export default tabReducer;