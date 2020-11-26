import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRoles, getRolesByPageNumber } from "@/actions/role";
import { Button, AutoComplete, Input, Icon, Table, Divider, Spin } from "antd";
import _ from "lodash";
import { withRouter } from "react-router";
import "./style.less";
const defaultPageSize = 10;
const columns = [
  {
    title: "角色名称",
    dataIndex: "Name",
    key: "Name"
  },
  {
    title: "功能模块",
    dataIndex: "PrivilegeCodes",
    key: "PrivilegeCodes"
  },
  {
    title: "更新",
    dataIndex: "Telephone",
    key: "Telephone"
  },
  {
    title: "操作",
    dataIndex: "Operations",
    key: "Operations",
    render: () => {
      return (
        <div className="flex-start-layout">
          <a>编辑</a>
          <Divider type="vertical" />
          <a>删除</a>
        </div>
      );
    }
  }
];

function Role(props) {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.platform.role.loading);
  const roles = useSelector(state => state.platform.role.roles);
  const roleNames = roles && roles.map(role => role.Name);
  const filterRoleName = roleName => {
    return null;
  };
  useEffect(() => {
    dispatch(getRolesByPageNumber(1));
  }, [dispatch]);
  return loading ? (
    <div className="flex-center-wrapper-layout">
      <Spin size="large" />
    </div>
  ) : (
    <div className="platform-manage">
      <div className="flex-start-layout">
        <Button icon="plus" className="platform-add-button">
          角色
        </Button>
        <AutoComplete
          style={{
            width: 200
          }}
          options={roleNames}
          filterOption={(inputValue, option) =>
            option.value.startsWith(inputValue)
          }
          onSelect={filterRoleName}
        >
          <Input prefix={<Icon type="search" />} placeholder="请搜索角色名称" />
        </AutoComplete>
      </div>
      <RoleTable />
    </div>
  );
}

function RoleTable(props) {
  const dispatch = useDispatch();
  const roles = useSelector(state => state.platform.role.roles);
  const [currentPage, setCurrentPage] = useState(1);
  const changePageNumber = (page, pageSize) => {
    getRolesByPageNumber(page);
    setCurrentPage(page);
  };

  return (
    <div className="platform-table-wrapper">
      <Table
        columns={columns}
        dataSource={roles}
        pagination={{
          current: currentPage,
          onChange: changePageNumber,
          pageSize: defaultPageSize,
          total: roles && roles.length
        }}
      />
    </div>
  );
}
export default withRouter(Role);
