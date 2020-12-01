import * as actionType from "@/actions/role";
import * as editAction from "@/actions/role/edit";
import _ from "lodash";
import { formStatus } from "@/constants/formStatus";

const initialState = {
  roles: null,
  currentEditedRole: null,
  currentRolePrivileges: null,
  currentAvailablePrivileges: null,
  currentPartnerId: null, //get currentAvailablePrivileges when partnerId is changed
  error: null,
  loading: false,
  status: formStatus.VIEW,
  loadingPrivilege: false,
  loadingAvailablePrivileges: false,
  needRefresh: true
};

export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case actionType.GET_ROLES_REQUEST: {
      return { ...state, roles: null, loading: true };
    }
    case actionType.GET_ROLES_SUCCESS: {
      const { CustomerId } = action;
      const roles = payload.filter(role => {
        if (CustomerId) {
          //用户为客户视角，此时只能展示客户视角下创建的角色
          return role.CustomerId === CustomerId;
        } else {
          //用户为SP视角，此时只能展示SP视角下创建的角色。
          //即SP视角和客户视角的角色是隔离的
          //*****此处期望修改API为传参CustomerId,后端判断返回什么样的角色
          return !role.CustomerId;
        }
      });
      return { ...state, roles, loading: false, needRefresh: false };
    }
    case actionType.GET_ROLES_FAILURE: {
      return { ...state, roles: null, loading: false };
    }
    case actionType.GET_ROLE_PRIVILEGES_REQUEST: {
      return {
        ...state,
        currentRolePrivileges: null,
        loading: false,
        loadingPrivilege: true
      };
    }
    case actionType.GET_ROLE_PRIVILEGES_SUCCESS: {
      return {
        ...state,
        currentRolePrivileges: payload,
        loading: false,
        loadingPrivilege: false
      };
    }
    case actionType.GET_ROLE_PRIVILEGES_FAILURE: {
      return { ...state, loadingPrivilege: false };
    }

    case actionType.GET_AVAILABLE_PRIVILEGES_REQUEST: {
      return {
        ...state,
        currentAvailablePrivileges: null,
        loadingAvailablePrivileges: true
      };
    }
    case actionType.GET_AVAILABLE_PRIVILEGES_SUCCESS: {
      const { partnerId } = payload;
      return {
        ...state,
        currentAvailablePrivileges: payload,
        loadingAvailablePrivileges: false,
        currentPartnerId: partnerId
      };
    }
    case actionType.GET_AVAILABLE_PRIVILEGES_FAILURE: {
      return { ...state, loadingAvailablePrivileges: false };
    }

    case editAction.SAVE_NEW_ROLE_REQUEST: {
      return { ...state, loading: true };
    }
    case editAction.SAVE_NEW_ROLE_SUCCESS: {
      return {
        ...state,
        currentEditedRole: null,
        loading: true, // the roles list will be refreshed, the loading status will be set false when roles list is reloaded
        status: formStatus.VIEW,
        needRefresh: true,
        currentAvailablePrivileges: null,
        currentRolePrivileges: null
      };
    }
    case editAction.SAVE_NEW_ROLE_FAILURE: {
      return { ...state, loading: false, status: formStatus.EDIT };
    }

    case editAction.SAVE_UPDATED_ROLE_REQUEST: {
      return { ...state, loading: true };
    }
    case editAction.SAVE_UPDATED_ROLE_SUCCESS: {
      return {
        ...state,
        currentEditedRole: null,
        loading: false,
        status: formStatus.VIEW,
        needRefresh: true,
        currentAvailablePrivileges: null,
        currentRolePrivileges: null
      };
    }
    case editAction.SAVE_UPDATED_ROLE_FAILURE: {
      return { ...state, loading: false };
    }

    case editAction.DELETE_ROLE_REQUEST: {
      return { ...state, loading: true };
    }

    case editAction.DELETE_ROLE_SUCCESS: {
      return {
        ...state,
        loading: false,
        needRefresh: true,
        currentAvailablePrivileges: null,
        currentRolePrivileges: null
      };
    }

    case editAction.DELETE_ROLE_FAILURE: {
      return { ...state, loading: false };
    }
    case editAction.CHANGE_CURRENT_EDITED_ROLE: {
      return {
        ...state,
        currentEditedRole: { ...payload }
      };
    }
    case editAction.CHANGE_ROLE_STATUS: {
      const { status, currentEditedRole } = payload;
      return {
        ...state,
        status,
        currentEditedRole: currentEditedRole || {}
      };
    }
    case actionType.ROLE_HAS_BEEN_USED_SUCCESS: {
      const isUsed = payload;
      const { currentEditedRole } = state;
      return { ...state, currentEditedRole: { ...currentEditedRole, isUsed } };
    }
    default:
      return state;
  }
};
