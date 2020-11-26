import { service } from "@se/pop";

export const GET_USERS_REQUEST = "platform/user/GET_USERS_REQUEST";
export const GET_USERS_SUCCESS = "platform/user/GET_USERS_SUCCESS";
export const GET_USERS_FAILURE = "platform/user/GET_USERS_FAILURE";

export function getUsers() {
  return async dispatch => {
    try {
      dispatch({
        type: GET_USERS_REQUEST
      });
      const url = "/users";
      const res = await service({ url, method: "get" });
      return dispatch({
        type: GET_USERS_SUCCESS,
        payload: res
      });
    } catch (error) {
      dispatch({
        type: GET_USERS_FAILURE,
        payload: error
      });
    }
  };
}

export function getUsersByPageNumber(pageNumber) {
  //need new api to filter user
  return async dispatch => {
    try {
      dispatch({
        type: GET_USERS_REQUEST
      });
      const url = "/users";
      const res = await service({ url, method: "get" });
      return dispatch({
        type: GET_USERS_SUCCESS,
        payload: res
      });
    } catch (error) {
      dispatch({
        type: GET_USERS_FAILURE,
        payload: error
      });
    }
  };
}

export const EDIT_USER = "platform/user/EDIT_USER";
export function editUser(user) {
  return { type: EDIT_USER, payload: user };
}

export const GET_USER_DATA_PERMISSION_REQUEST =
  "platform/user/GET_USER_DATA_PERMISSION_REQUEST";
export const GET_USER_DATA_PERMISSION_SUCCESS =
  "platform/user/GET_USER_DATA_PERMISSION_SUCCESS";
export const GET_USER_DATA_PERMISSION_FAILURE =
  "platform/user/GET_USER_DATA_PERMISSION_FAILURE";
export function getUserDataPermission(user) {
  return async dispatch => {
    try {
      dispatch({
        type: GET_USER_DATA_PERMISSION_REQUEST
      });
      const url = `/user/${user.Id}/usercustomers`;
      const res = await service({ url, method: "get" });
      return dispatch({
        type: GET_USER_DATA_PERMISSION_SUCCESS,
        payload: res
      });
    } catch (error) {
      dispatch({
        type: GET_USER_DATA_PERMISSION_FAILURE,
        payload: error
      });
    }
  };
}
