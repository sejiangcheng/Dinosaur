import { service } from "@se/pop";

export const SAVE_NEW_ROLE_REQUEST = "platform/role/CREATE_NEW_ROLE_REQUEST";
export const SAVE_NEW_ROLE_SUCCESS = "platform/role/CREATE_NEW_ROLE_SUCCESS";
export const SAVE_NEW_ROLE_FAILURE = "platform/role/CREATE_NEW_ROLE_FAILURE";

export function saveNewRole(params) {
  return async dispatch => {
    try {
      dispatch({
        type: SAVE_NEW_ROLE_REQUEST
      });
      const url = "/role/create";
      const res = await service({ url, method: "post", data: params });
      return dispatch({
        type: SAVE_NEW_ROLE_SUCCESS,
        payload: res
      });
    } catch (error) {
      return dispatch({
        type: SAVE_NEW_ROLE_FAILURE,
        payload: error
      });
    }
  };
}

export const SAVE_UPDATED_ROLE_REQUEST =
  "platform/role/SAVE_UPDATED_ROLE_REQUEST";
export const SAVE_UPDATED_ROLE_SUCCESS =
  "platform/role/SAVE_UPDATED_ROLE_SUCCESS";
export const SAVE_UPDATED_ROLE_FAILURE =
  "platform/role/SAVE_UPDATED_ROLE_FAILURE";

export function saveEditedRole(params) {
  return async dispatch => {
    try {
      dispatch({
        type: SAVE_UPDATED_ROLE_REQUEST
      });
      const url = "/role/update";
      const res = await service({ url, method: "post", data: params });
      return dispatch({
        type: SAVE_UPDATED_ROLE_SUCCESS,
        payload: res
      });
    } catch (error) {
      return dispatch({
        type: SAVE_UPDATED_ROLE_FAILURE,
        payload: error
      });
    }
  };
}

export const DELETE_ROLE_REQUEST = "platform/role/DELETE_ROLE_REQUEST";
export const DELETE_ROLE_SUCCESS = "platform/role/DELETE_ROLE_SUCCESS";
export const DELETE_ROLE_FAILURE = "platform/role/DELETE_ROLE_FAILURE";

export function deleteRole(role) {
  return async dispatch => {
    try {
      dispatch({
        type: DELETE_ROLE_REQUEST
      });
      const url = "/role/delete";
      const res = await service({ url, method: "post", data: role });
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

export const CHANGE_ROLE_STATUS = "platform/role/CHANGE_ROLE_STATUS";
export function changeRoleStatus(status, currentEditedRole) {
  return {
    type: CHANGE_ROLE_STATUS,
    payload: { status, currentEditedRole }
  };
}

export const CHANGE_CURRENT_EDITED_ROLE =
  "platform/user/CHANGE_CURRENT_EDITED_ROLE";
export function changeCurrentEditedRole(currentEditedRole) {
  return {
    type: CHANGE_CURRENT_EDITED_ROLE,
    payload: currentEditedRole
  };
}
