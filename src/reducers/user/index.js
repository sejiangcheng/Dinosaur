import * as actionType from "@/actions/user";
import * as editAction from "@/actions/user/edit";
import _ from "lodash";
import { formStatus } from "@/constants/formStatus";

const initialState = {
  users: null,
  filteredUsers: [],
  currentUser: null,
  currentUserDataPermission: null,
  currentEditedDataPermission: null,
  currentUserHasAllDataPermission: false,
  currentEditedUser: null,
  error: null,
  loading: false,
  loadingDataPermission: false,
  status: formStatus.VIEW,
  needRefresh: true,
  showSaveSuccessMessage: false,
  hierarchyMap: {}
};

export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case actionType.GET_USERS_REQUEST: {
      return { ...state, users: null, loading: true };
    }
    case actionType.GET_USERS_SUCCESS: {
      return { ...state, users: payload, loading: false, needRefresh: false };
    }
    case actionType.GET_USERS_FAILURE: {
      return { ...state, users: null, loading: false };
    }
    case actionType.GET_USER_DATA_PERMISSION_REQUEST: {
      return {
        ...state,
        loadingDataPermission: true,
        currentUserDataPermission: null,
        currentUserHasAllDataPermission: false
      };
    }
    case actionType.GET_USER_DATA_PERMISSION_SUCCESS: {
      return {
        ...state,
        loadingDataPermission: false,
        currentUserDataPermission: payload.data,
        currentUserHasAllDataPermission: payload.hasAllPermissions
      };
    }
    case editAction.SET_USER_HAS_ALL_DATA_PERMISSION: {
      return {
        ...state,
        currentUserHasAllDataPermission: payload
      };
    }
    case actionType.GET_USER_DATA_PERMISSION_FAILURE: {
      return {
        ...state,
        loadingDataPermission: false,
        currentUserDataPermission: null,
        currentUserHasAllDataPermission: false
      };
    }
    case editAction.CREATE_USER: {
      return { ...state, currentEditedUser: {}, status: formStatus.ADD };
    }
    case editAction.CREATE_NEW_USER_REQUEST: {
      return { ...state, loading: true };
    }
    case editAction.CREATE_NEW_USER_SUCCESS: {
      return {
        ...state,
        currentEditedUser: null,
        loading: true, // the user list will be refreshed, the loading status will be set false when user list is reloaded
        status: formStatus.VIEW
      };
    }
    case editAction.CREATE_NEW_USER_FAILURE: {
      return { ...state, loading: false, status: formStatus.EDIT };
    }
    case editAction.UPDATE_USER_REQUEST: {
      return { ...state, loading: true };
    }
    case editAction.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        currentEditedUser: null,
        loading: true,
        status: formStatus.VIEW
      };
    }
    case editAction.UPDATE_USER_FAILURE: {
      return { ...state, loading: false, status: formStatus.EDIT };
    }

    case editAction.DELETE_USER_REQUEST: {
      return { ...state, loading: true };
    }

    case editAction.DELETE_USER_SUCCESS: {
      return { ...state, loading: false, needRefresh: true };
    }

    case editAction.DELETE_USER_FAILURE: {
      return { ...state, loading: false };
    }

    case actionType.EDIT_USER: {
      const user = payload;
      return {
        ...state,
        currentEditedUser: _.cloneDeep(user),
        status: formStatus.EDIT
      };
    }
    case editAction.SAVE_EDITED_USER: {
      return { ...state, currentEditedUser: null, status: formStatus.VIEW };
    }
    case editAction.CHANGE_USER_STATUS: {
      const { status, user: currentEditedUser } = payload;
      return {
        ...state,
        status,
        currentEditedUser
      };
    }
    case editAction.CHANGE_CURRENT_EDITED_USER: {
      return {
        ...state,
        currentEditedUser: { ...payload }
      };
    }
    default:
      return state;
  }
};