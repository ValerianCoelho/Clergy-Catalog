import { SET_DIALOG_STATE } from "./actions";

const initialState = {
  open: false,
  title: '',
  msg: '',
}

const dialogReducer = (state = initialState, action)=> {
  switch(action.type) {
    case SET_DIALOG_STATE: {
      return {
        ...state,
        open: action.payload.open,
        title: action.payload.title,
        msg: action.payload.msg,
      }
    }
    default: return state;
  }
}

export default dialogReducer;