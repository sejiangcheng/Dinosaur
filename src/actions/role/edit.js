import { service } from "@se/pop";

export const CREATE_NEW_ROLE_REQUEST = "platform/role/CREATE_NEW_ROLE_REQUEST";
export const CREATE_NEW_ROLE_SUCCESS = "platform/role/CREATE_NEW_ROLE_SUCCESS";
export const CREATE_NEW_ROLE_FAILURE = "platform/role/CREATE_NEW_ROLE_FAILURE";

export function createNewRole(params) {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_NEW_ROLE_REQUEST
      });
      const url = "/role/create";
      const res = await service({ url, method: "post", data: params });
      return dispatch({
        type: CREATE_NEW_ROLE_SUCCESS,
        payload: res
      });
    } catch (error) {
      return dispatch({
        type: CREATE_NEW_ROLE_FAILURE,
        payload: error
      });
    }
  };
}

export const UPDATE_ROLE_REQUEST = "platform/role/UPDATE_ROLE_REQUEST";
export const UPDATE_ROLE_SUCCESS = "platform/role/UPDATE_ROLE_SUCCESS";
export const UPDATE_ROLE_FAILURE = "platform/role/UPDATE_ROLE_FAILURE";

export function updateRole(params) {
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_ROLE_REQUEST
      });
      const url = "/role/update";
      const res = await service({ url, method: "post", data: params });
      return dispatch({
        type: UPDATE_ROLE_SUCCESS,
        payload: res
      });
    } catch (error) {
      return dispatch({
        type: UPDATE_ROLE_FAILURE,
        payload: error
      });
    }
  };
}

export const DELETE_ROLE_REQUEST = "platform/role/DELETE_ROLE_REQUEST";
export const DELETE_ROLE_SUCCESS = "platform/role/DELETE_ROLE_SUCCESS";
export const DELETE_ROLE_FAILURE = "platform/role/DELETE_ROLE_FAILURE";

export function deleteRole(params) {
  return async dispatch => {
    try {
      dispatch({
        type: DELETE_ROLE_REQUEST
      });
      const url = "/role/delete";
      const res = await service({ url, method: "post", data: params });
      return dispatch({
        type: DELETE_ROLE_SUCCESS,
        payload: res
      });
    } catch (error) {
      return dispatch({
        type: DELETE_ROLE_FAILURE,
        payload: error
      });
    }
  };
}

export const SAVE_EDITED_ROLE = "platform/role/SAVE_EDITED_ROLE";
