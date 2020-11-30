import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsersByPageNumber } from "@/actions/user";
import {
  saveNewUser,
  deleteUser,
  changeUserStatus,
  saveEditedUserBasicInfo,
  saveEditedUserDataPermission
} from "@/actions/user/edit";
import {
  Divider,
  Drawer,
  Modal,
  Icon,
  Spin,
  Radio,
  Menu,
  Dropdown,
  message
} from "antd";
import _ from "lodash";
import { withRouter } from "react-router";
import { formStatus } from "@/constants/formStatus";
import PlatformPage from "../platformPage";
import UserDrawerContent from "./UserDrawerContent";
import "./style.less";
import { sendEmail, sendMessage } from "@/actions/user/index";
import { getRoles } from "@/actions/role";
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
  onDelete,
  renderFilterRolesDropdown
) => {
  return [
    {
      title: "用户名",
      dataIndex: "Name",
      key: "Name",
      width: "16%"
    },
    {
      title: "角色",
      dataIndex: "UserTypeName",
      key: "UserTypeName",
      filterDropdown: renderFilterRolesDropdown(),
      width: "15%"
    },
    {
      title: "邮箱",
      dataIndex: "Email",
      key: "Email",
      width: "18%"
    },
    {
      title: "手机",
      dataIndex: "Telephone",
      key: "Telephone",
      width: "13%"
    },
    {
      title: "备注",
      dataIndex: "Description",
      key: "Description",
      width: "27%"
    },
    {
      title: "操作",
      dataIndex: "Operations",
      key: "Operations",
      width: "11%",
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
    currentEditedDataPermission,
    currentUserHasAllDataPermission,
    needRefresh,
    showSaveSuccessMessage
  } = useSelector(state => state.platform.user);
  const user = useSelector(state => state.main.currentUser);
  const loadingRole = useSelector(state => state.platform.role.loading);
  const roles = useSelector(state => state.platform.role.roles);
  const [columns, setColumns] = useState([]);
  const [multipleDrawer, setMultipleDrawer] = useState(false);
  const [filterParams, setFilterParams] = useState({});
  useEffect(() => {
    if (!roles) {
      const { CustomerId } = user;
      //只有用户为客户视角时才有customerId
      dispatch(getRoles(CustomerId));
    } else {
      const columns = getColumns(
        onViewDataPermission,
        onEditBasicInfo,
        onEditDataPermission,
        onResetPasswordByEmail,
        onResetPasswordByMessage,
        onDelete,
        renderFilterRolesDropdown
      );
      setColumns(columns);
    }
  }, [roles, filterParams]);

  const resetFilter = () => {
    setFilterParams({ roleId: null });
  };
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
  const onResetPasswordByEmail = user => {
    sendEmail(user.Id).then(() => {
      message.success("发送成功，重置密码的链接在24小时内有效，请及时通知用户");
    });
  };
  const onResetPasswordByMessage = user => {
    sendMessage(user.Id).then(() => {
      message.success("发送成功，重置密码的链接在24小时内有效，请及时通知用户");
    });
  };
  const onCreateUser = () => {
    dispatch(changeUserStatus(formStatus.ADD));
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
      dispatch(
        saveNewUser({
          currentEditedUser,
          currentEditedDataPermission,
          currentUserHasAllDataPermission
        })
      );
    } else if (status === formStatus.EDIT_BASIC_INFO) {
      dispatch(saveEditedUserBasicInfo(currentEditedUser));
    } else if (status === formStatus.EDIT_DATA_PERMISSION) {
      dispatch(
        saveEditedUserDataPermission({
          UserId: currentEditedUser.Id,
          Version: currentEditedUser.Version,
          WholeSystem: currentUserHasAllDataPermission,
          Privileges: currentEditedDataPermission
          // PrivilegeType:0？
        })
      );
    }
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
  const renderFilterRolesDropdown = () => {
    return (
      <div className="table-filter-group">
        <Radio.Group
          onChange={e => {
            setFilterParams({ roleId: e.target.value });
          }}
          value={filterParams && filterParams.roleId}
        >
          {roles.map(role => {
            return (
              <Radio value={role.Id} key={role.Id}>
                <span className="role-check-value">{role.Name}</span>
              </Radio>
            );
          })}
        </Radio.Group>
        <div className="table-filter-group-footer">
          <span onClick={resetFilter}>重置</span>
        </div>
      </div>
    );
  };
  const params = {
    store: {
      list: users,
      loading: loading,
      status,
      needRefresh,
      showSaveSuccessMessage
    },
    platformType: "用户",
    getListByPageNumber: getUsersByPageNumber,
    searchName: "Name",
    searchPlaceholder: "请搜索用户名称",
    onAddNewMember: onCreateUser
  };
  if (loadingRole) {
    return (
      <div className="flex-center-wrapper-layout">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <>
      <PlatformPage {...params} columns={columns} filterParams={filterParams} />
      {status !== formStatus.VIEW && (
        <Drawer
          className={
            "platform-edit-drawer" + (multipleDrawer ? " multiple-drawer" : "")
          }
          closable
          destroyOnClose={true}
          placement="right"
          onClose={onClose}
          visible={true}
          title={getDrawerTitle()}
        >
          <UserDrawerContent
            onClose={onClose}
            onSave={onSave}
            onChildDrawerVisibleChange={visible => {
              setMultipleDrawer(visible);
            }}
          />
        </Drawer>
      )}
    </>
  );
}

export default withRouter(User);
