import * as actionType from "@/actions/role";
import * as editAction from "@/actions/role/edit";
import _ from "lodash";
import { formStatus } from "@/constants/formStatus";

const initialState = {
  roles: null,
  currentRole: null,
  currentEditedRole: null,
  error: null,
  loading: false,
  status: formStatus.VIEW
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
      return { ...state, roles, loading: false };
    }
    case actionType.GET_ROLES_FAILURE: {
      return { ...state, roles: null, loading: false };
    }
    case editAction.CREATE_NEW_ROLE_REQUEST: {
      return { ...state, loading: true };
    }
    case editAction.CREATE_NEW_ROLE_SUCCESS: {
      return {
        ...state,
        currentEditedRole: null,
        loading: true, // the roles list will be refreshed, the loading status will be set false when roles list is reloaded
        status: formStatus.VIEW
      };
    }
    case editAction.CREATE_NEW_ROLE_FAILURE: {
      return { ...state, loading: false, status: formStatus.EDIT };
    }
    case editAction.UPDATE_ROLE_REQUEST: {
      return { ...state, loading: true };
    }
    case editAction.UPDATE_ROLE_SUCCESS: {
      return {
        ...state,
        currentEditedRole: null,
        loading: true,
        status: formStatus.VIEW
      };
    }
    case editAction.UPDATE_ROLE_FAILURE: {
      return { ...state, loading: false, status: formStatus.EDIT };
    }

    case editAction.DELETE_ROLE_REQUEST: {
      return { ...state, loading: true };
    }

    case editAction.DELETE_ROLE_SUCCESS: {
      return { ...state, loading: true };
    }

    case editAction.DELETE_ROLE_FAILURE: {
      return { ...state, loading: false };
    }

    case actionType.EDIT_ROLE: {
      const role = payload;
      return {
        ...state,
        currentEditedRole: _.cloneDeep(role),
        status: formStatus.EDIT
      };
    }
    case editAction.SAVE_EDITED_ROLE: {
      return { ...state, currentEditedRole: null, status: formStatus.VIEW };
    }
    default:
      return state;
  }
};
