import { service } from "@se/pop";

export const GET_ROLES_REQUEST = "platform/user/GET_ROLES_REQUEST";
export const GET_ROLES_SUCCESS = "platform/user/GET_ROLES_SUCCESS";
export const GET_ROLES_FAILURE = "platform/user/GET_ROLES_FAILURE";

export function getRoles(CustomerId) {
  return async dispatch => {
    try {
      dispatch({
        type: GET_ROLES_REQUEST
      });
      const url = "/roles";
      const res = await service({ url, method: "get" });
      return dispatch({
        type: GET_ROLES_SUCCESS,
        payload: res,
        CustomerId
      });
    } catch (error) {
      dispatch({
        type: GET_ROLES_FAILURE,
        payload: error
      });
    }
  };
}

export const EDIT_ROLE = "platform/role/EDIT_ROLE";
export function editRole(role) {
  return { type: EDIT_ROLE, payload: role };
}

export const GET_ROLE_PRIVILEGES_REQUEST = "platform/role/GET_ROLE_PRIVILEGES";
export const GET_ROLE_PRIVILEGES_SUCCESS =
  "platform/role/GET_ROLE_PRIVILEGES_SUCCESS";
export const GET_ROLE_PRIVILEGES_FAILURE =
  "platform/role/GET_ROLE_PRIVILEGES_FAILURE";

export function getRolePrivileges(roleId) {
  return async dispatch => {
    try {
      dispatch({
        type: GET_ROLE_PRIVILEGES_REQUEST
      });
      const url = `/role/${roleId}/roleprivileges`;
      const res = await service({ url, method: "get" });
      return dispatch({
        type: GET_ROLE_PRIVILEGES_SUCCESS,
        payload: res
      });
    } catch (error) {
      dispatch({
        type: GET_ROLE_PRIVILEGES_FAILURE,
        payload: error
      });
    }
  };
}

export const GET_AVAILABLE_PRIVILEGES_REQUEST =
  "platform/role/GET_AVAILABLE_PRIVILEGES";
export const GET_AVAILABLE_PRIVILEGES_SUCCESS =
  "platform/role/GET_AVAILABLE_PRIVILEGES_SUCCESS";
export const GET_AVAILABLE_PRIVILEGES_FAILURE =
  "platform/role/GET_AVAILABLE_PRIVILEGES_FAILURE";

export function getAvailablePrivileges(partnerId) {
  //此请求需要partnerId
  return async dispatch => {
    try {
      dispatch({
        type: GET_AVAILABLE_PRIVILEGES_REQUEST
      });
      const url = `/role/allroleprivileges?partnerId=${partnerId}`;
      const res = await service({ url, method: "get" });
      return dispatch({
        type: GET_AVAILABLE_PRIVILEGES_SUCCESS,
        payload: res,
        partnerId
      });
    } catch (error) {
      dispatch({
        type: GET_AVAILABLE_PRIVILEGES_FAILURE,
        payload: error
      });
    }
  };
}
