import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRoles } from "@/actions/role";
import { Button, Drawer, Table, Divider, Spin, Icon, Modal } from "antd";
import {
  changeRoleStatus,
  deleteRole,
  saveNewRole,
  saveEditedRole
} from "@/actions/role/edit";
import _ from "lodash";
import "./style.less";
import { formStatus } from "@/constants/formStatus";
import RoleDrawerContent from "./RoleDrawerContent";

const getColumns = (onEdit, onDelete) => {
  return [
    {
      title: "角色名称",
      dataIndex: "Name",
      key: "Name",
      width: "18%"
    },
    {
      title: "功能模块",
      dataIndex: "PackageNames",
      key: "PackageNames",
      width: "44%"
    },
    {
      title: "更新",
      dataIndex: "Telephone",
      key: "Telephone",
      width: "26%"
    },
    {
      title: "操作",
      dataIndex: "Operations",
      key: "Operations",
      width: "12%",
      render: (text, record, index) => {
        return (
          <div className="flex-start-layout">
            <a
              onClick={() => {
                onEdit(record);
              }}
            >
              编辑
            </a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                onDelete(record);
              }}
            >
              删除
            </a>
          </div>
        );
      }
    }
  ];
};

export default function Role(props) {
  const dispatch = useDispatch();
  const {
    loading,
    roles,
    status,
    needRefresh,
    currentEditedRole
  } = useSelector(state => state.platform.role);
  useEffect(() => {
    if (needRefresh) {
      dispatch(getRoles());
    }
  }, [needRefresh]);
  const createRole = () => {
    dispatch(changeRoleStatus(formStatus.ADD));
  };
  const onEditRole = role => {
    dispatch(changeRoleStatus(formStatus.EDIT, role));
  };
  const onDeleteRole = role => {
    Modal.confirm({
      content: `确认删除当前角色【${role.Name}】？`,
      okText: "删除",
      centered: true,
      icon: <Icon type="info-circle" theme="filled" />,
      onOk: () => {
        dispatch(deleteRole(role));
      },
      okType: "danger"
    });
  };
  const onClose = () => {
    dispatch(changeRoleStatus(formStatus.VIEW));
  };
  const onSave = () => {
    if (status === formStatus.ADD) {
      dispatch(saveNewRole(currentEditedRole));
    } else {
      dispatch(saveEditedRole(currentEditedRole));
    }
  };
  const columns = getColumns(onEditRole, onDeleteRole);
  return loading ? (
    <div className="flex-center-wrapper-layout">
      <Spin size="large" />
    </div>
  ) : (
    <div className="platform-manage">
      <div className="flex-start-layout">
        <Button
          icon="plus"
          type="primary"
          onClick={createRole}
          className="platform-add-button"
        >
          角色
        </Button>
      </div>
      <div className="platform-table-wrapper">
        <Table
          columns={columns}
          dataSource={roles}
          pagination={false}
          size="middle"
        />
      </div>
      <Drawer
        className="role-edit-drawer"
        visible={status !== formStatus.VIEW}
        destroyOnClose={true}
        onClose={onClose}
        title={`${status === formStatus.ADD ? "新建" : "编辑"}角色`}
      >
        <RoleDrawerContent onClose={onClose} onSave={onSave} />
      </Drawer>
    </div>
  );
}
