import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsersByPageNumber } from "@/actions/user";
import {
  createUser,
  saveNewUser,
  saveEditedUser,
  deleteUser,
  saveSuccessMessageShowed,
  changeUserStatus
} from "@/actions/user/edit";
import {
  Divider,
  Drawer,
  Button,
  Form,
  Modal,
  Icon,
  Menu,
  Dropdown
} from "antd";
import _ from "lodash";
import { withRouter } from "react-router";
import { formStatus } from "@/constants/formStatus";
import PlatformPage from "../platformPage";
import UserDrawerContent from "./UserDrawerContent";
import "./style.less";
const getMenu = (
  user,
  onEditBasicInfo,
  onEditDataPermission,
  onResetPasswordByEmail,
  onResetPasswordByMessage,
  onDelete
) => (
  <Menu
    onClick={({ item }) => {
      item.props.clickEvent && item.props.clickEvent(user);
    }}
  >
    <Menu.Item clickEvent={onEditBasicInfo}>
      <div>编辑基本信息</div>
    </Menu.Item>
    <Menu.Item clickEvent={onEditDataPermission}>
      <div>编辑数据权限</div>
    </Menu.Item>
    <Menu.Item clickEvent={onResetPasswordByEmail}>
      <div>发送重置密码邮件</div>
    </Menu.Item>
    <Menu.Item clickEvent={onResetPasswordByMessage}>
      <div>发送重置密码短信</div>
    </Menu.Item>
    <Menu.Item clickEvent={onDelete}>
      <div>删除</div>
    </Menu.Item>
  </Menu>
);

const getColumns = (
  onViewDataPermission,
  onEditBasicInfo,
  onEditDataPermission,
  onResetPasswordByEmail,
  onResetPasswordByMessage,
  onDelete
) => {
  return [
    {
      title: "用户名",
      dataIndex: "Name",
      key: "Name"
    },
    {
      title: "角色",
      dataIndex: "UserTypeName",
      key: "UserTypeName"
    },
    {
      title: "邮箱",
      dataIndex: "Email",
      key: "Email"
    },
    {
      title: "手机",
      dataIndex: "Telephone",
      key: "Telephone"
    },
    {
      title: "备注",
      dataIndex: "Description",
      key: "Description"
    },
    {
      title: "操作",
      dataIndex: "Operations",
      key: "Operations",
      render: (text, record, index) => {
        return (
          <div className="flex-start-layout">
            <a
              onClick={() => {
                onViewDataPermission(record);
              }}
            >
              数据权限
            </a>
            <Divider type="vertical" />
            <Dropdown
              trigger={["click"]}
              overlay={getMenu(
                record,
                onEditBasicInfo,
                onEditDataPermission,
                onResetPasswordByEmail,
                onResetPasswordByMessage,
                onDelete
              )}
            >
              <a
                className="ant-dropdown-link"
                onClick={e => e.preventDefault()}
              >
                更多 <Icon type="down" />
              </a>
            </Dropdown>
          </div>
        );
      }
    }
  ];
};

function User(props) {
  const dispatch = useDispatch();
  const {
    users,
    status,
    loading,
    currentEditedUser,
    needRefresh,
    showSaveSuccessMessage
  } = useSelector(state => state.platform.user);
  const onViewDataPermission = user => {
    dispatch(changeUserStatus(formStatus.VIEW_DATA_PERMISSION, user));
  };
  const onEditBasicInfo = user => {
    dispatch(changeUserStatus(formStatus.EDIT_BASIC_INFO, user));
  };
  const onEditDataPermission = user => {
    dispatch(changeUserStatus(formStatus.EDIT_DATA_PERMISSION, user));
  };
  const onClose = () => {
    dispatch(changeUserStatus(formStatus.VIEW, null));
  };
  const onResetPasswordByEmail = user => {};
  const onResetPasswordByMessage = user => {};
  const onCreateUser = () => {
    dispatch(createUser());
  };
  const onDelete = user => {
    Modal.confirm({
      content: `该操作将导致【${user.Name}】下全部数据将永久被删除，确认删除？`,
      okText: "删除",
      centered: true,
      icon: <Icon type="info-circle" theme="filled" />,
      onOk: () => {
        dispatch(deleteUser(user));
      },
      okType: "danger"
    });
  };
  const onSave = () => {
    if (status === formStatus.ADD) {
      dispatch(saveNewUser());
    } else {
      dispatch(saveEditedUser(currentEditedUser));
    }
  };

  const params = {
    store: {
      list: users,
      loading,
      status,
      needRefresh,
      showSaveSuccessMessage
    },
    platformType: "用户",
    getListByPageNumber: getUsersByPageNumber,
    saveSuccessMessageShowed,
    searchName: "Name",
    searchPlaceholder: "请搜索用户名称",
    columns: getColumns(
      onViewDataPermission,
      onEditBasicInfo,
      onEditDataPermission,
      onResetPasswordByEmail,
      onResetPasswordByMessage,
      onDelete
    ),
    onAddNewMember: onCreateUser
  };
  const getDrawerTitle = () => {
    if (status === formStatus.VIEW_DATA_PERMISSION) {
      return <div>查看数据权限-{currentEditedUser.Name}</div>;
    } else if (status === formStatus.EDIT_DATA_PERMISSION) {
      return <div>查看数据权限-{currentEditedUser.Name}</div>;
    } else if (status === formStatus.EDIT_BASIC_INFO) {
      return <div>编辑基本信息-{currentEditedUser.Name}</div>;
    } else if (status === formStatus.ADD) {
      return <div>新建用户</div>;
    }
  };
  return (
    <>
      <PlatformPage {...params} />
      {status !== formStatus.VIEW && (
        <Drawer
          className="platform-edit-drawer"
          closable
          destroyOnClose={true}
          placement="right"
          onClose={onClose}
          visible={true}
          title={getDrawerTitle()}
        >
          <UserDrawerContent onClose={onClose} onSave={onSave} />
        </Drawer>
      )}
    </>
  );
}

export default withRouter(User);
