import React from "react";
import { Icon } from "antd";
import "./style.less";

export default function WarningBar(props) {
  const { message } = props;
  return (
    <div className="warning-bar">
      <Icon
        className="warning-icon"
        type="info-circle"
        theme="filled"
        style={{ color: "#faad14" }}
      />
      <span>{message}</span>
    </div>
  );
}
