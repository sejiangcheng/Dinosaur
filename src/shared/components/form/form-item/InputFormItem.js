import React from "react";
import { Form, Input } from "antd";
import CommonFormItem from "./CommonFormItem";
const { TextArea } = Input;
export default function InputFormItem(props) {
  const { code, onChange, isTextArea } = props;
  return (
    <CommonFormItem
      {...props}
      component={
        isTextArea ? (
          <TextArea
            onChange={e => {
              onChange(code, e.target.value);
            }}
            placeholder={"请输入"}
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        ) : (
          <Input
            placeholder={"请输入"}
            onChange={e => {
              onChange(code, e.target.value);
            }}
          />
        )
      }
    />
  );
}