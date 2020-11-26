import { combineReducers } from "redux";
import role from "./role";
import customer from "./customer";
import user from "./user";

export const initialState = {
  data: {}
};

function main(state = initialState, action) {
  return state;
}

export default combineReducers({
  main,
  role,
  customer,
  user
});
