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

export function getRolesByPageNumber(pageNumber) {
  return async dispatch => {
    try {
      dispatch({
        type: GET_ROLES_REQUEST
      });
      const url = "/roles";
      const res = await service({ url, method: "get" });
      return dispatch({
        type: GET_ROLES_SUCCESS,
        payload: res
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
