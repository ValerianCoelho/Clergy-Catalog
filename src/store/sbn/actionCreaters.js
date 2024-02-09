import { SET_SBN } from './actions';

export const setSbn = (sbn)=> {
  return {
      type: SET_SBN,
      payload: sbn
  }
}