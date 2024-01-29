import { CHANGE_TAB } from './actions';

export const changeTab = (tab)=> {
  return {
      type: CHANGE_TAB,
      payload: tab
  }
}