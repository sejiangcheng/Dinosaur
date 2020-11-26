import React from "react";
import { Radio } from "antd";
import CommonFormItem from "./CommonFormItem";
export default function InputFormItem(props) {
  const { options } = props;
  const { code, onChange } = props;
  return (
    <CommonFormItem
      {...props}
      component={
        <Radio.Group
          onChange={e => {
            onChange(code, e.target.value);
          }}
        >
          {options.map(options => {
            return <Radio value={options.value}>{options.label}</Radio>;
          })}
        </Radio.Group>
      }
    />
  );
}
