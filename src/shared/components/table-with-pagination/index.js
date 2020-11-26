import React from "react";
import "./style.less";
import { Table } from "antd";

export default function TableWithPagination(props) {
  return (
    <div className="table-wrapper">
      <Table {...props} />
    </div>
  );
}
