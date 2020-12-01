import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Spin } from "antd";
import { getRolePrivileges } from "@/actions/role";

const columns = [
  {
    title: "PackageName",
    dataIndex: "PackageName",
    key: "PackageName",
    render: (text, record, index) => {
      return (
        <div className="highlighted-bar-wrapper">
          <span className="highlighted-bar"></span>
          {text}
        </div>
      );
    }
  }
];

export default function RolePrivilegeView(props) {
  const { roleId } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRolePrivileges(roleId));
  }, []);
  const { currentRolePrivileges: packages } = useSelector(
    state => state.platform.role
  );
  const expandedRowRender = (record, index) => {
    const columns = [
      { title: "name", dataIndex: "Name", key: "Name" },
      { title: "actionName", dataIndex: "ActionName", key: "ActionName" }
    ];
    return (
      <Table
        rowClassName="feature-row"
        columns={columns}
        dataSource={record.Features}
        pagination={false}
        showHeader={false}
        defaultExpandAllRow={true}
      />
    );
  };
  return packages ? (
    <Table
      columns={columns}
      expandIconAsCell={false}
      expandIcon={() => {
        return null;
      }}
      rowClassName="package-row"
      expandedRowRender={expandedRowRender}
      defaultExpandAllRows={true}
      dataSource={packages}
      pagination={false}
      showHeader={false}
    />
  ) : (
    <div className="flex-center-wrapper-layout">
      <Spin size="large" />
    </div>
  );
}
