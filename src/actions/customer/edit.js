import { service } from "@se/pop";
import * as actionType from "@/actions/main";

export const CREATE_NEW_CUSTOMER_REQUEST =
  "platform/customer/CREATE_NEW_CUSTOMER_REQUEST";
export const CREATE_NEW_CUSTOMER_SUCCESS =
  "platform/customer/CREATE_NEW_CUSTOMER_SUCCESS";
export const CREATE_NEW_CUSTOMER_FAILURE =
  "platform/customer/CREATE_NEW_CUSTOMER_FAILURE";

export function saveNewCustomer(params) {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_NEW_CUSTOMER_REQUEST
      });
      const url = "/customer/create";
      const res = await service({ url, method: "post", data: params });
      dispatch({
        type: actionType.DISPLAY_SAVE_SUCESS_MESSAGE
      });
      return dispatch({
        type: CREATE_NEW_CUSTOMER_SUCCESS,
        payload: res
      });
    } catch (error) {
      return dispatch({
        type: CREATE_NEW_CUSTOMER_FAILURE,
        payload: error
      });
    }
  };
}

export const UPDATE_CUSTOMER_REQUEST =
  "platform/customer/UPDATE_CUSTOMER_REQUEST";
export const UPDATE_CUSTOMER_SUCCESS =
  "platform/customer/UPDATE_CUSTOMER_SUCCESS";
export const UPDATE_CUSTOMER_FAILURE =
  "platform/customer/UPDATE_CUSTOMER_FAILURE";

export function saveEditedCustomer(params) {
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_CUSTOMER_REQUEST
      });
      const url = "/customer/update";
      const res = await service({ url, method: "post", data: params });
      dispatch({
        type: actionType.DISPLAY_SAVE_SUCESS_MESSAGE
      });
      return dispatch({
        type: UPDATE_CUSTOMER_SUCCESS,
        payload: res
      });
    } catch (error) {
      return dispatch({
        type: UPDATE_CUSTOMER_FAILURE,
        payload: error
      });
    }
  };
}

export const DELETE_CUSTOMER_REQUEST =
  "platform/customer/DELETE_CUSTOMER_REQUEST";
export const DELETE_CUSTOMER_SUCCESS =
  "platform/customer/DELETE_CUSTOMER_SUCCESS";
export const DELETE_CUSTOMER_FAILURE =
  "platform/customer/DELETE_CUSTOMER_FAILURE";

export function deleteCustomer(customer) {
  return async dispatch => {
    try {
      dispatch({
        type: DELETE_CUSTOMER_REQUEST
      });
      const url = `/customer/delete/${customer.CustomerCode}`;
      const res = await service({ url, method: "post" });

      return dispatch({
        type: DELETE_CUSTOMER_SUCCESS,
        payload: res
      });
    } catch (error) {
      return dispatch({
        type: DELETE_CUSTOMER_FAILURE,
        payload: error
      });
    }
  };
}

export const EDIT_CUSTOMER = "platform/customer/EDIT_CUSTOMER";
export function editCustomer(customer) {
  return { type: EDIT_CUSTOMER, payload: customer };
}

export const CREATE_CUSTOMER = "platform/customer/CREATE_CUSTOMER";
export function createCustomer() {
  return { type: CREATE_CUSTOMER };
}

export const CLOSE_EDIT_STATUS = "platform/customer/CLOSE_EDIT_STATUS";
export function closeEditStatus() {
  return { type: CLOSE_EDIT_STATUS };
}

export const CHANGE_CURRENT_EDITED_CUSTOMER =
  "platform/customer/CHANGE_CURRENT_EDITED_CUSTOMER";
export function changeCurrentEditedCustomer(currentEditedCustomer) {
  return {
    type: CHANGE_CURRENT_EDITED_CUSTOMER,
    payload: currentEditedCustomer
  };
}
