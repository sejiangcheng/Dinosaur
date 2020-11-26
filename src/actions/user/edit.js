import { service } from "@se/pop";

export const CREATE_NEW_USER_REQUEST = "platform/user/CREATE_NEW_USER_REQUEST";
export const CREATE_NEW_USER_SUCCESS = "platform/user/CREATE_NEW_USER_SUCCESS";
export const CREATE_NEW_USER_FAILURE = "platform/user/CREATE_NEW_USER_FAILURE";

export function saveNewUser(params) {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_NEW_USER_REQUEST
      });
      const url = "/user/create";
      const res = await service({ url, method: "post", data: params });
      return dispatch({
        type: CREATE_NEW_USER_SUCCESS,
        payload: res
      });
    } catch (error) {
      return dispatch({
        type: CREATE_NEW_USER_FAILURE,
        payload: error
      });
    }
  };
}

export const UPDATE_USER_REQUEST = "platform/user/UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "platform/user/UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "platform/user/UPDATE_USER_FAILURE";

export function saveEditedUser(params) {
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_USER_REQUEST
      });
      const url = "/user/update";
      const res = await service({ url, method: "post", data: params });
      return dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: res
      });
    } catch (error) {
      return dispatch({
        type: UPDATE_USER_FAILURE,
        payload: error
      });
    }
  };
}

export const DELETE_USER_REQUEST = "platform/user/DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "platform/user/DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "platform/user/DELETE_USER_FAILURE";

export function deleteUser(params) {
  return async dispatch => {
    try {
      dispatch({
        type: DELETE_USER_REQUEST
      });
      const url = "/user/delete";
      const res = await service({ url, method: "post", data: params });
      return dispatch({
        type: DELETE_USER_SUCCESS,
        payload: res
      });
    } catch (error) {
      return dispatch({
        type: DELETE_USER_FAILURE,
        payload: error
      });
    }
  };
}

export const SAVE_EDITED_USER = "platform/user/SAVE_EDITED_USER";

export const EDIT_USER = "platform/user/EDIT_USER";
export function editUser(user) {
  return { type: EDIT_USER, payload: user };
}

export const CREATE_USER = "platform/user/CREATE_USER";
export function createUser() {
  return { type: CREATE_USER };
}

export const CLOSE_EDIT_STATUS = "platform/user/CLOSE_EDIT_STATUS";
export function closeEditStatus() {
  return { type: CLOSE_EDIT_STATUS };
}

export const CHANGE_CURRENT_EDITED_USER =
  "platform/user/CHANGE_CURRENT_EDITED_USER";
export function changeCurrentEditedUser(currentEditedUser) {
  return {
    type: CHANGE_CURRENT_EDITED_USER,
    payload: currentEditedUser
  };
}

export const SAVE_SUCCESS_MESSAGE_SHOWED =
  "platform/user/SAVE_SUCCESS_MESSAGE_SHOWED";
export function saveSuccessMessageShowed() {
  return {
    type: SAVE_SUCCESS_MESSAGE_SHOWED
  };
}

export const CHANGE_USER_STATUS = "platform/user/CHANGE_USER_STATUS";
export function changeUserStatus(status, user) {
  return {
    type: CHANGE_USER_STATUS,
    payload: {
      status,
      user
    }
  };
}

export const SET_DATA_PERMISSION = "platform/user/SET_DATA_PERMISSION";
export function setDataPermission(dataPermission) {
  return {
    type: SET_DATA_PERMISSION,
    payload: dataPermission
  };
}

export const SET_USER_HAS_ALL_DATA_PERMISSION =
  "platform/user/SET_USER_HAS_ALL_DATA_PERMISSION";
export function changeUserHasAllDataPermission(hasAll) {
  return {
    type: SET_USER_HAS_ALL_DATA_PERMISSION,
    payload: hasAll
  };
}
