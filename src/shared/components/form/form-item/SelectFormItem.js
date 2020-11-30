import React from "react";
import { Select } from "antd";
import CommonFormItem from "./CommonFormItem";
const { Option } = Select;

export default function SelectFormItem(props) {
  const { code, onChange, options, renderOptions, optionLabelProp } = props;
  return (
    <CommonFormItem
      {...props}
      component={
        <Select
          placeholder={"请选择"}
          onChange={val => {
            onChange(code, val);
          }}
          optionLabelProp={optionLabelProp}
        >
          {renderOptions ||
            (options &&
              options.map(option => {
                return <Option value={option.value}>{option.label}</Option>;
              }))}
        </Select>
      }
    />
  );
}
