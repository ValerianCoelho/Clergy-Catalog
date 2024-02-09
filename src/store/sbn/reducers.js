import { SET_SBN } from "./actions";

const initialState = {
  sbn: 0
}

const sbnReducer = (state = initialState, action)=> {
  switch(action.type) {
    case SET_SBN: {
      return {
        ...state,
        sbn: action.payload
      }
    }
    default: return state;
  }
}

export default sbnReducer;