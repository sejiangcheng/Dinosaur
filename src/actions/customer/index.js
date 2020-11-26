import { service } from "@se/pop";

export const GET_CUSTOMERS_REQUEST = "platform/customer/GET_CUSTOMERS_REQUEST";
export const GET_CUSTOMERS_SUCCESS = "platform/customer/GET_CUSTOMERS_SUCCESS";
export const GET_CUSTOMERS_FAILURE = "platform/customer/GET_CUSTOMERS_FAILURE";

export function getCustomers() {
  return async dispatch => {
    try {
      dispatch({
        type: GET_CUSTOMERS_REQUEST
      });
      const url = "/customers";
      const res = await service({ url, method: "get" });
      return dispatch({
        type: GET_CUSTOMERS_SUCCESS,
        payload: res
      });
    } catch (error) {
      dispatch({
        type: GET_CUSTOMERS_FAILURE,
        payload: error
      });
    }
  };
}

export function getCustomersByPageNumber(pageNumber, keyword) {
  //need new api to filter customer
  return async dispatch => {
    try {
      dispatch({
        type: GET_CUSTOMERS_REQUEST
      });
      const url = `/customers?page=${pageNumber}&keyword=${keyword}`;
      const res = await service({ url, method: "get" });
      return dispatch({
        type: GET_CUSTOMERS_SUCCESS,
        payload: res
      });
    } catch (error) {
      dispatch({
        type: GET_CUSTOMERS_FAILURE,
        payload: error
      });
    }
  };
}
