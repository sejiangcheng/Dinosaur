import { combineReducers } from "redux";
import role from "./role";
import customer from "./customer";
import user from "./user";
import * as actionType from "@/actions/main";

export const initialState = {
  showSaveSuccessMessage: false
};

function main(state = initialState, action) {
  switch (action.type) {
    case actionType.DISPLAY_SAVE_SUCESS_MESSAGE: {
      return { ...state, showSaveSuccessMessage: true };
    }
    case actionType.SAVE_SUCCESS_MESSAGE_SHOWED: {
      return { ...state, showSaveSuccessMessage: false };
    }
    default:
      return state;
  }
}

export default combineReducers({
  main,
  role,
  customer,
  user
});
