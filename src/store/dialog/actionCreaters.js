import { SET_DIALOG_STATE } from './actions';

export const setDialogState = (open, title, msg)=> {
  return {
      type: SET_DIALOG_STATE,
      payload: { open, title, msg }
  }
}