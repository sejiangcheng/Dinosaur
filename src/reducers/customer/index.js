import * as actionType from "@/actions/customer";
import * as editAction from "@/actions/customer/edit";
import _ from "lodash";
import { formStatus } from "@/constants/formStatus";

const initialState = {
  customers: null,
  filteredCustomers: [],
  currentEditedCustomer: null,
  error: null,
  loading: false,
  status: formStatus.VIEW,
  needRefresh: true
};

export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case actionType.GET_CUSTOMERS_REQUEST: {
      return { ...state, customers: null, loading: true };
    }
    case actionType.GET_CUSTOMERS_SUCCESS: {
      return {
        ...state,
        customers: payload,
        loading: false,
        needRefresh: false
      };
    }
    case actionType.GET_CUSTOMERS_FAILURE: {
      return { ...state, customers: null, loading: false };
    }
    case editAction.CREATE_CUSTOMER: {
      return { ...state, currentEditedCustomer: {}, status: formStatus.ADD };
    }
    case editAction.CREATE_NEW_CUSTOMER_REQUEST: {
      return { ...state, loading: true };
    }
    case editAction.CREATE_NEW_CUSTOMER_SUCCESS: {
      return {
        ...state,
        currentEditedCustomer: null,
        loading: true, // the customer list will be refreshed, the loading status will be set false when customer list is reloaded
        status: formStatus.VIEW,
        needRefresh: true
      };
    }
    case editAction.CREATE_NEW_CUSTOMER_FAILURE: {
      return { ...state, loading: false, status: formStatus.EDIT };
    }
    case editAction.UPDATE_CUSTOMER_REQUEST: {
      return { ...state, loading: true };
    }
    case editAction.UPDATE_CUSTOMER_SUCCESS: {
      return {
        ...state,
        currentEditedCustomer: null,
        loading: true,
        status: formStatus.VIEW,
        needRefresh: true
      };
    }
    case editAction.UPDATE_CUSTOMER_FAILURE: {
      return { ...state, loading: false, status: formStatus.EDIT };
    }

    case editAction.DELETE_CUSTOMER_REQUEST: {
      return { ...state, loading: true };
    }

    case editAction.DELETE_CUSTOMER_SUCCESS: {
      return { ...state, loading: true, needRefresh: true };
    }

    case editAction.DELETE_CUSTOMER_FAILURE: {
      return { ...state, loading: false };
    }

    case editAction.EDIT_CUSTOMER: {
      const customer = payload;
      return {
        ...state,
        currentEditedCustomer: _.cloneDeep(customer),
        status: formStatus.EDIT
      };
    }
    case editAction.CLOSE_EDIT_STATUS: {
      return {
        ...state,
        status: formStatus.VIEW,
        currentEditedCustomer: null
      };
    }
    case editAction.CHANGE_CURRENT_EDITED_CUSTOMER: {
      return {
        ...state,
        currentEditedCustomer: { ...payload }
      };
    }
    default:
      return state;
  }
};
